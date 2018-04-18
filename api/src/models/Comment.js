const mongoose = require('mongoose');
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
    required: true,
    index: true,
  },
  inReplyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post',
    index: true,
  },
  message: {
    type: String,
    required: true,
  },
  isFlagged: {
    type: Boolean,
    default: false,
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

CommentSchema.statics.formatArrayOfComments = async function(comments, requestUser) {
  const formattedComments = await Promise.all(comments.map(async (comment) =>
    await comment.getApiResponse(requestUser)
  ));

  return formattedComments;
};

CommentSchema.methods.getApiResponse = async function(requestUser) {
  const baseEventResponse = {
    id: this.id,
    message: this.message,
    edits: this.edits,
    isFlagged: this.isFlagged,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };

  if (this.isFlagged && requestUser.role !== ADMIN_ROLE) {
    baseEventResponse.message = 'This comment was deleted by a moderator.';
  }

  try {
    const user = !this.isFlagged && this.user && this.user.getApiResponse ?
      await this.user.getApiResponse(requestUser) : (this.user || null);

    const event = this.event && this.event.getApiResponse ?
      await this.event.getApiResponse(requestUser) : (this.event || null);

    const inReplyTo = this.inReplyTo && this.inReplyTo.getApiResponse ?
      await this.inReplyTo.getApiResponse(requestUser) : (this.inReplyTo || null);

    return {
      ...baseEventResponse,
      user,
      event,
      inReplyTo,
    };
  } catch (error) {
    console.error(error);
    return baseEventResponse;
  }
};

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;
