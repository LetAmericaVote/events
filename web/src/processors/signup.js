export default function processSignup(signup) {
  const hasUser = !!signup.user;
  const hasEvent = !!signup.event;
  const isFlagged = !!signup.flag;

  const isUserFilled = hasUser && typeof signup.user === 'object';
  const isEventFilled = hasEvent && typeof signup.event === 'object';
  const isFlagFilled = isFlagged && typeof signup.flag === 'object';

  const userId = hasUser ? (
    isUserFilled ? signup.user.id : signup.user
  ) : null;

  const eventId = hasUser ? (
    isEventFilled ? signup.event.id : signup.event
  ) : null;

  const flagId = isFlagged ? (
    isFlagFilled ? signup.flag.id : signup.flag
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

  if (flagId) {
    processSignup.flag = flagId;
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

  if (isFlagFilled) {
    processedData.flag = signup.flag;
  }

  return processedData;
}
