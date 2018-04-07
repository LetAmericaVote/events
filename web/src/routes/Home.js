import React from 'react';
import Rivet from '../Rivet';
import { fetchPaginatedEvents, fetchEventByGeoLocation, fetchEventById, fetchEventBySlug } from '../actions';

const Home = (props) => {
  // props.fetchPaginatedEvents(true);
  props.fetchEventByGeoLocation(-73.695602, 40.979801, 100000);
  setTimeout(() => props.fetchEventByGeoLocation(-73.695602, 40.979801, 100000), 2000);
  // props.fetchEventById('5ac7ecb76e3da5286b01058a');
  // props.fetchEventBySlug('joes-test-event');

  return (
    <section>
      <h1>home</h1>
    </section>
  );
}

Home.actionCreators = {
  fetchPaginatedEvents,
  fetchEventByGeoLocation,
  fetchEventById,
  fetchEventBySlug,
};

export default Rivet(Home);
