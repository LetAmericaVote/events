export default function processComment(comment) {
  const hasUser = !!comment.user;
  const hasEvent = !!comment.event;
  const isReply = !!comment.inReplyTo;
  const isFlagged = !!comment.flag;

  const isUserFilled = hasUser && typeof comment.user === 'object';
  const isEventFilled = hasEvent && typeof comment.event === 'object';
  const isReplyFilled = isReply && typeof comment.inReplyTo === 'object';
  const isFlagFilled = isFlagged && typeof comment.flag === 'object';

  const userId = hasUser ? (
    isUserFilled ? comment.user.id : comment.user
  ) : null;

  const eventId = hasEvent ? (
    isEventFilled ? comment.event.id : comment.event
  ) : null;

  const inReplyToId = isReply ? (
    isReplyFilled ? comment.inReplyTo.id : comment.inReplyTo
  ) : null;

  const flagId = isFlagged ? (
    isFlagFilled ? comment.flag.id : comment.flag
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

  if (flagId) {
    processedComment.flag = flagId;
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

  if (isFlagFilled) {
    processedData.flag = comment.flag;
  }

  return processedData;
}
