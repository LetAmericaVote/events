// TODO: handle inReplyTo

export default function processComment(comment) {
  const hasUser = !!comment.user;
  const hasEvent = !!comment.event;
  const isReply = !!comment.isReplyTo;

  const isUserFilled = hasUser && typeof comment.user === 'object';
  const isEventFilled = hasEvent && typeof comment.event === 'object';
  const isReplyFilled = isReply && typeof comment.inReplyTo === 'object';

  const userId = hasUser ? (
    isUserFilled ? comment.user.id : comment.user
  ) : null;

  const eventId = hasEvent ? (
    isEventFilled ? comment.event.id : comment.event
  ) : null;

  const inReplyToId = isReply ? (
    isReplyFilled ? comment.inReplyTo.id : comment.inReplyTo
  ) : null;

  const processedComment = {
    ...comment,
  };

  if (userId) {
    processedComment.user = userId;
  }

  if (eventId) {
    processedComment.event = eventId;
  }

  if (inReplyToId) {
    processedComment.inReplyTo = inReplyToId;
  }

  const processedData = {
    comment: processedComment,
  };

  if (isUserFilled) {
    processedData.user = comment.user;
  }

  if (isEventFilled) {
    processedData.event = comment.event;
  }

  if (isReplyFilled) {
    processedData.parentComment = comment.inReplyTo;
  }

  return processedData;
}
