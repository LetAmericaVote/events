const Comment = require('../models/Comment');
const Signup = require('../models/Signup');
const { requiresAuth } = require('../middleware/auth');

const MAX_EDITS = 5;
const MAX_REPLY_LENGTH = 24;

async function getUserComments(req, res) {
  const { requestUser } = res.locals;
  const { start, limit, sortByPosted } = req.query;
  const parsedSort = parseInt(sortByPosted);
  const parsedLimit = Math.max(parseInt(limit), 0);

  if (sortByPosted && (parsedSort !== 1 || parsedSort !== 1)) {
    return res.status(400).json({ error: true, message: 'Invalid sort direction' });
  }

  const findQuery = {
    user: requestUser,
  };

  if (start) {
    const symbol = parsedSort === -1 ? '$lt': '$gt';

    findQuery['_id'] = {
      [symbol]: start,
    };
  }

  const limitCount = parsedLimit > 25 ? 25 : parsedLimit;
  const sortQuery = !!parsedSort ? { '_id': parsedSort } : {};

  const comments = await Comment.find(findQuery)
    .populate('user event inReplyTo')
    .sort(sortQuery)
    .limit(limitCount);

  const formattedComments = await Comment.formatArrayOfComments(comments, requestUser);

  res.json({
    comments: formattedComments,
  });
}

async function getEventComments(req, res) {
  const { requestUser } = res.locals;
  const { eventId } = req.params;
  const { start, limit, sortByPosted, inReplyTo } = req.query;
  const parsedSort = parseInt(sortByPosted);
  const parsedLimit = Math.max(parseInt(limit), 0);

  if (sortByPosted && (parsedSort !== 1 || parsedSort !== 1)) {
    return res.status(400).json({ error: true, message: 'Invalid sort direction' });
  }

  const signup = await Signup.findOne({ user: requestUser, event: eventId });
  if (! signup || ! signup.id) {
    return res.status(401).json({ error: true, message: 'You must be signed up for this event' });
  }

  const findQuery = {
    event: eventId,
  };

  if (start) {
    const symbol = parsedSort === -1 ? '$lt': '$gt';

    findQuery['_id'] = {
      [symbol]: start,
    };
  }

  if (typeof inReplyTo !== 'undefined') {
    if (inReplyTo === 'null') {
      findQuery.inReplyTo = { '$eq': null };
    } else if (typeof inReplyTo === 'string') {
      findQuery.inReplyTo = inReplyTo
    }
  }

  const limitCount = parsedLimit > 25 ? 25 : parsedLimit;
  const sortQuery = (sortByRecent === 'true') ? { '_id': parsedSort } : {};

  const comments = await Comment.find(findQuery)
    .populate('user event inReplyTo')
    .sort(sortQuery)
    .limit(limitCount);

  const formattedComments = await Comment.formatArrayOfComments(comments, requestUser);

  res.json({
    comments: formattedComments,
  });
}

async function getEventComment(req, res) {
  const { requestUser } = res.locals;
  const { eventId, commentId } = req.params;

  const signup = await Signup.findOne({ user: requestUser, event: eventId });
  if (! signup || ! signup.id) {
    return res.status(401).json({ error: true, message: 'You must be signed up for this event' });
  }

  const findQuery = {
    _id: commentId,
    event: eventId,
  };

  const comment = await Comment.find(findQuery)
    .populate('user event inReplyTo');

  if (! comment || ! comment.id) {
    return res.status(404).json({ error: true, message: 'Comment not found' });
  }

  const formattedComment = await comment.getApiResponse(requestUser);

  res.json({
    comment: formattedComment,
  });
}

async function postEventComment(req, res) {
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

  const populatedComment = await Comment.populate(comment, 'user event inReplyTo');
  const formattedComment = await populatedComment.getApiResponse(requestUser);

  res.json({
    comment: formattedComment,
  });
}

async function updateEventComment(req, res) {
  const { requestUser } = res.locals;
  const { eventId, commentId } = req.params;
  const { message } = req.body;

  const signup = await Signup.findOne({ user: requestUser, event: eventId });
  if (! signup || ! signup.id) {
    return res.status(401).json({ error: true, message: 'You must be signed up for this event' });
  }

  const findQuery = {
    _id: commentId,
    event: eventId,
  };

  const comment = await Comment.find(findQuery)
    .populate('user event inReplyTo');

  if (! comment || ! comment.id) {
    return res.status(404).json({ error: true, message: 'Comment not found' });
  }

  if (comment.user.id !== requestUser.id) {
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

  const formattedComment = await populatedComment.getApiResponse(requestUser);

  res.json({
    comment: formattedComment,
  });
}

async function deleteEventComment(req, res) {
  const { requestUser } = res.locals;
  const { eventId, commentId } = req.params;
  const { message } = req.body;

  const signup = await Signup.findOne({ user: requestUser, event: eventId });
  if (! signup || ! signup.id) {
    return res.status(401).json({ error: true, message: 'You must be signed up for this event' });
  }

  const findQuery = {
    _id: commentId,
    event: eventId,
  };

  const comment = await Comment.find(findQuery)
    .populate('user event inReplyTo');

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
    route: '/v1/comments/user',
    method: 'get',
    handler: getUserComments,
    middleware: requiresAuth,
  },
  {
    route: '/v1/comments/id/:commentId/event/:eventId',
    method: 'get',
    handler: getEventComment,
    middleware: requiresAuth,
  },
  {
    route: '/v1/comments/id/:commentId/event/:eventId',
    method: 'put',
    handler: updateEventComment,
    middleware: requiresAuth,
  },
  {
    route: '/v1/comments/id/:commentId/event/:eventId',
    method: 'delete',
    handler: deleteEventComment,
    middleware: requiresAuth,
  },
  {
    route: '/v1/comments/event/:eventId',
    method: 'get',
    handler: getEventComments,
    middleware: requiresAuth,
  },
  {
    route: '/v1/comments/event/:eventId',
    method: 'post',
    handler: postEventComment,
    middleware: requiresAuth,
  },
];
