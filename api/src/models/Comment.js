const mongoose = require('mongoose');

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
  };

  try {
    const user = this.user && this.user.getApiResponse ?
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

// TODO: we gotta change this at some point...
const Comment = mongoose.model('post', CommentSchema);

module.exports = Comment;
