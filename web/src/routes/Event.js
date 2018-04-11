import React from 'react';

const Event = (props) => {
  const { eventSlug } = props;

  return (
    <section>
      <h1>event {eventSlug}</h1>
    </section>
  );
}

export default Event;
