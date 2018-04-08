const Comment = require('../models/Comment');
const Signup = require('../models/Signup');
const { requireUser } = require('../middleware/auth');

async function getUserComments(req, res) {
  const { requestUser } = res.locals;
  const { start, limit, sortByRecent } = req.query;
  const parsedLimit = Math.max(parseInt(limit), 0);

  const findQuery = {
    user: requestUser,
  };

  if (start) {
    findQuery['_id'] = {
      '$gt': start,
    };
  }

  const limitCount = parsedLimit > 25 ? 25 : parsedLimit;
  const sortQuery = (sortByRecent === 'true') ? { '_id': -1 } : {};

  const comments = await Comment.find(findQuery)
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
  const { start, limit, sortByRecent, inReplyTo } = req.query;
  const parsedLimit = Math.max(parseInt(limit), 0);

  const signup = await Signup.findOne({ user: requestUser, event: eventId });
  if (! signup || ! signup.id) {
    return res.status(401).json({ error: true, message: 'You must be signed up for this event' });
  }

  const findQuery = {
    event: eventId,
  };

  if (start) {
    findQuery['_id'] = {
      '$gt': start,
    };
  }

  if (typeof inReplyTo !== 'undefined') {
    findQuery.inReplyTo = inReplyTo;
  }

  const limitCount = parsedLimit > 25 ? 25 : parsedLimit;
  const sortQuery = (sortByRecent === 'true') ? { '_id': -1 } : {};

  const comments = await Comment.find(findQuery)
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

  const comment = await Comment.find(findQuery);

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

    comment.inReplyTo = comment;
  }

  await comment.save();

  const populatedComment = await Comment.populate(comment, 'user event inReplyTo'); // TODO: Does this work the way I think it does?
  const formattedComment = await populatedComment.getApiResponse(requestUser);

  res.json({
    comment: formattedComment,
  });
}

module.exports = [
  {
    route: '/v1/comments/user',
    method: 'get',
    handler: getUserComments,
    middleware: requireUser,
  },
  {
    route: '/v1/comments/id/:commentId/event/:eventId',
    method: 'get',
    handler: getEventComment,
    middleware: requireUser,
  },
  {
    route: '/v1/comments/event/:eventId',
    method: 'get',
    handler: getEventComments,
    middleware: requireUser,
  },
  {
    route: '/v1/comments/event/:eventId',
    method: 'post',
    handler: postEventComment,
    middleware: requireUser,
  },
];
