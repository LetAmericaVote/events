export default function processSignup(signup) {
  const hasUser = !!signup.user;
  const hasEvent = !!signup.event;

  const isUserFilled = hasUser && typeof signup.user === 'object';
  const isEventFilled = hasEvent && typeof signup.event === 'object';

  const userId = hasUser ? (
    isUserFilled ? signup.user.id : signup.user
  ) : null;

  const eventId = hasUser ? (
    isEventFilled ? signup.event.id : signup.event
  ) : null;

  const processedSignup = {
    ...signup,
  };

  if (userId) {
    processedSignup.user = userId;
  }

  if (eventId) {
    processedSignup.event = eventId;
  }

  const processedData = {
    signup: processedSignup,
  };

  if (isUserFilled) {
    processedData.user = signup.user;
  }

  if (isEventFilled) {
    processedData.event = signup.event;
  }

  return processedData;
}
