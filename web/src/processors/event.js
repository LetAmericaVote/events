export default function processEvent(event) {
  const hasHostUser = !!event.hostUser;

  const isHostUserFilled = hasHostUser &&
    typeof event.hostUser === 'object';

  const hostUserId = hasHostUser ? (
    isHostUserFilled ? event.hostUser.id : event.hostUser
  ) : null;

  const processedEvent = {
    ...event,
  };

  if (hostUserId) {
    processEvent.hostUser = hostUserId;
  }

  const processedData = {
    event: processedEvent,
  };

  if (isHostUserFilled) {
    processedData.user = event.user;
  }

  return processedData;
}
