export default function processComment(comment) {
  const hasUser = !!comment.user;
  const hasEvent = !!comment.event;

  const isUserFilled = hasUser && typeof comment.user === 'object';
  const isEventFilled = hasEvent && typeof comment.event === 'object';

  const userId = hasUser ? (
    isUserFilled ? comment.user.id : comment.user
  ) : null;

  const eventId = hasUser ? (
    isEventFilled ? comment.event.id : comment.event
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

  const processedData = {
    signup: processedComment,
  };

  if (isUserFilled) {
    processedData.user = comment.user;
  }

  if (isEventFilled) {
    processedData.event = comment.event;
  }

  return processedData;
}
