const mongoose = require('mongoose');
const Event = require('./Event');
const Signup = require('./Signup');
const { ADMIN_ROLE } = require('../lib/common');

const CommentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    index: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'event',
    index: true,
  },
  inReplyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comment',
    index: true,
  },
  message: {
    type: String,
    required: true,
  },
  flag: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'flag',
  },
  edits: [
    {
      type: String,
      default: [],
    }
  ],
}, {
  timestamps: true,
});

CommentSchema.statics.formatArrayOfComments = async function(comments, requestUser, populate = false) {
  const formattedComments = await Promise.all(comments.map(async (comment) =>
    await comment.getApiResponse(requestUser, populate)
  ));

  return formattedComments;
};

CommentSchema.methods.getApiResponse = async function(requestUser, populate = false) {
  const baseEventResponse = {
    id: this.id,
    message: this.message,
    edits: this.edits,
    isFlagged: !!this.flag,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };

  try {
    if (this.event && requestUser && requestUser.id) {
      const signup = await Signup.findOne({ user: requestUser, event: this.event });

      if (!signup || !!signup.flag) {
        return {
          id: this.id,
          createdAt: this.createdAt,
        };
      }
    }

    // The flagged & event check is to prevent the unnecessary query if its false.
    const isHostUser = (requestUser && requestUser.id && !!this.flag && this.event) ?
      await Event.isHostUser(requestUser.id || requestUser) : false;

    const hideDetails = !!this.flag && (
      (requestUser || {}).role !== ADMIN_ROLE || ! isHostUser
    );

    if (hideDetails) {
      baseEventResponse.message = 'This comment was deleted by a moderator.';
    }

    if (populate) {
      await this.populate('user event inReplyTo flag');
    }

    const user = ! hideDetails && this.user && this.user.getApiResponse ?
      await this.user.getApiResponse(requestUser) : (this.user || null);

    const event = this.event && this.event.getApiResponse ?
      await this.event.getApiResponse(requestUser) : (this.event || null);

    const inReplyTo = this.inReplyTo && this.inReplyTo.getApiResponse ?
      await this.inReplyTo.getApiResponse(requestUser) : (this.inReplyTo || null);

    const flag = this.flag && this.flag.getApiResponse ?
      await this.flag.getApiResponse(requestUser) : (this.flag || null);

    return {
      ...baseEventResponse,
      user,
      event,
      inReplyTo,
      flag,
    };
  } catch (error) {
    console.error(error);
    return baseEventResponse;
  }
};

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;
