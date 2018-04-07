import React from 'react';

const Event = (props) => {
  const { match } = props;
  const { eventId } = match;

  return (
    <section>
      <h1>event {eventId}</h1>
    </section>
  );
}

export default Event;
