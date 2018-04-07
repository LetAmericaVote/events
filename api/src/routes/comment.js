const Comment = require('../models/Comment');
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

  const findQuery = {
    event: eventId,
  };

  if (start) {
    findQuery['_id'] = {
      '$gt': start,
    };
  }

  if (inReplyTo) {
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

async function postEventComment(req, res) {
  const { requestUser } = res.locals;
  const { eventId } = req.params;
  const { message, inReplyTo } = req.body;

  if (! message) {
    return res.status(400).json({ error: true, message: 'Missing message' });
  }

  const comment = new Comment({ user: requestUser, event: eventId, message });
  if (inReplyTo) {
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
    route: '/v1/comments',
    method: 'get',
    handler: getUserComments,
    middleware: requireUser,
  },
  // TODO: Make individual comment getter
  // {
  //   route: '/v1/comment/:commentId',
  //   method: 'get',
  // }
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
