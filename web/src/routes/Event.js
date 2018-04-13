import React from 'react';
import Rivet from '../hoc/Rivet';
import { selectEventIdBySlug } from '../selectors';

const Event = (props) => {
  const { eventSlug } = props;

  if (! eventSlug) {
    // TODO: Return 404 page
    return null;
  }

  return (
    <section>
      <h1>event {eventSlug}</h1>
    </section>
  );
}

Event.mapStateToProps = (state, ownProps) => ({
  eventId: selectEventIdBySlug(ownProps.eventSlug, state),
});

export default Rivet(Event);
