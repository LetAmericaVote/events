export default function processEvent(event) {
  const hasHostUser = !!event.hostUser;

  return {
    event: {
      ...event,
      hostUser: hasHostUser ? event.hostUser.id : null,
    },
    user: (hasHostUser ? { ...event.hostUser } : false),
  };
}
