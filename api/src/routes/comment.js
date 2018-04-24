const Comment = require('../models/Comment');
const Signup = require('../models/Signup');
const { requiresAuth } = require('../middleware/auth');

const MAX_EDITS = 5;
const MAX_REPLY_LENGTH = 24;

async function getComments(req, res) {
  const { requestUser } = res.locals;
  const { start, limit, sortByPosted, eventId, userId, inReplyTo } = req.query;

  const parsedLimit = Math.max(parseInt(limit), 0) || 25;
  const limitCount = parsedLimit > 25 ? 25 : parsedLimit;

  const parsedSort = parseInt(sortByPosted);

  if (sortByPosted && (parsedSort !== -1 && parsedSort !== 1)) {
    return res.status(400).json({ error: true, message: 'Invalid sort direction.' });
  }

  const findQuery = {};

  if (start) {
    const symbol = parsedSort === -1 ? '$lt': '$gt';

    findQuery['_id'] = {
      [symbol]: start,
    };
  }

  if (userId) {
    if (userId !== requestUser.id) {
      // TODO: Add profile options so people can choose to share this or not.
      return res.status(401).json({ error: true, message: 'You cannot request other user comments at this time.' });
    }

    findQuery.user = userId;
  }

  if (eventId) {
    const signup = await Signup.findOne({ user: requestUser, event: eventId });
    if (! signup || ! signup.id) {
      return res.status(401).json({ error: true, message: 'You must be signed up for this event.' });
    }

    if (!! signup.flag) {
      return res.status(401).json({ error: true, message: 'You\'ve been flagged from further posting in this event.'});
    }

    findQuery.event = eventId;
  }

  if (inReplyTo) {
    if (inReplyTo === 'top') {
      findQuery.inReplyTo = null;
    } else {
      findQuery.inReplyTo = inReplyTo;
    }
  }

  const sortQuery = !!parsedSort ? { '_id': parsedSort } : {};

  const comments = await Comment.find(findQuery)
    .sort(sortQuery)
    .limit(limitCount);

  const formattedComments = await Comment.formatArrayOfComments(comments, requestUser, true);

  const remainingCount = await Comment.count(findQuery);
  const remaining = remainingCount - formattedComments.length;
  const total = await Comment.count();

  res.json({
    comments: formattedComments,
    meta: {
      remaining,
      total,
    },
  });
}

async function getComment(req, res) {
  const { requestUser } = res.locals;
  const { commentId } = req.params;

  const findQuery = {
    _id: commentId,
  };

  const comment = await Comment.find(findQuery);

  if (! comment || ! comment.id) {
    return res.status(404).json({ error: true, message: 'Comment not found' });
  }

  if (comment.event) {
    const signup = await Signup.findOne({ user: requestUser, event: comment.event });

    if (! signup || ! signup.id) {
      return res.status(401).json({ error: true, message: 'You must be signed up for this event' });
    }

    if (!! signup.flag) {
      return res.status(401).json({ error: true, message: 'You\'ve been flagged from further posting in this event'});
    }
  }

  const formattedComment = await comment.getApiResponse(requestUser, true);

  res.json({
    comment: formattedComment,
  });
}

async function postComment(req, res) {
  const { requestUser } = res.locals;
  const { eventId } = req.params;
  const { message, inReplyTo } = req.body;

  if (! message) {
    return res.status(400).json({ error: true, message: 'Missing message' });
  }

  const signup = await Signup.findOne({ user: requestUser, event: eventId });
  if (! signup || ! signup.id) {
    return res.status(401).json({ error: true, message: 'You must be signed up for this event' });
  }

  const comment = new Comment({ user: requestUser, event: eventId, message });
  if (inReplyTo) {
    const inReplyToComment = await Comment.findOne({ _id: inReplyTo });

    if (! inReplyToComment || ! inReplyToComment.id) {
      return res.status(400).json({ error: true, message: 'Invalid reply' });
    }

    if (inReplyToComment.inReplyTo) {
      return res.status(400).json({ error: true, message: 'You can\'t reply to that comment' });
    }

    if (message.length >= MAX_REPLY_LENGTH) {
      return res.status(400).json({ error: true, message: 'Replies are capped to 24 characters' });
    }

    comment.inReplyTo = comment;
  }

  await comment.save();

  const formattedComment = await comment.getApiResponse(requestUser, true);

  res.json({
    comment: formattedComment,
  });
}

async function updateComment(req, res) {
  const { requestUser } = res.locals;
  const { commentId } = req.params;
  const { message } = req.body;

  const findQuery = {
    _id: commentId,
  };

  const comment = await Comment.findOne(findQuery);

  if (! comment || ! comment.id) {
    return res.status(404).json({ error: true, message: 'Comment not found' });
  }

  if (comment.event) {
    const signup = await Signup.findOne({ user: requestUser, event: comment.event });

    if (! signup || ! signup.id) {
      return res.status(401).json({ error: true, message: 'You must be signed up for this event' });
    }

    if (!! signup.flag) {
      return res.status(401).json({ error: true, message: 'You\'ve been flagged from further posting in this event'});
    }
  }

  if (comment.user !== requestUser.id) {
    return res.status(401).json({ error: true, message: 'You are not authorized to edit other user comments' });
  }

  if (comment.inReplyTo && message.length > MAX_REPLY_LENGTH) {
    return res.status(400).json({ error: true, message: 'Replies are capped to 24 characters' });
  }

  if (comment.edits && comment.edits.length >= MAX_EDITS) {
    return res.status(400).json({ error: true, message: 'Max edits reached for this comment' });
  }

  if (! comment.edits) {
    comment.edits = [];
  }

  comment.edits.push(comment.message);
  comment.message = message;

  await comment.save();

  const formattedComment = await comment.getApiResponse(requestUser, true);

  res.json({
    comment: formattedComment,
  });
}

async function deleteComment(req, res) {
  const { requestUser } = res.locals;
  const { commentId } = req.params;

  const findQuery = {
    _id: commentId,
  };

  const comment = await Comment.find(findQuery);

  if (! comment || ! comment.id) {
    return res.status(404).json({ error: true, message: 'Comment not found' });
  }

  if (comment.user.id !== requestUser.id) {
    return res.status(401).json({ error: true, message: 'You are not authorized to edit other user comments' });
  }

  await comment.remove();

  res.json({
    ok: true,
    deleted: commentId,
  });
}

module.exports = [
  {
    route: '/v1/comments',
    method: 'get',
    handler: getComments,
    middleware: requiresAuth,
  },
  {
    route: '/v1/comments/id/:id',
    method: 'get',
    handler: getComment,
    middleware: requiresAuth,
  },
  {
    route: '/v1/comments',
    method: 'post',
    handler: postComment,
    middleware: requiresAuth,
  },
  {
    route: '/v1/comments/id/:commentId',
    method: 'put',
    handler: updateComment,
    middleware: requiresAuth,
  },
  {
    route: '/v1/comments/id/:commentId',
    method: 'delete',
    handler: deleteComment,
    middleware: requiresAuth,
  },
];
