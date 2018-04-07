import React from 'react';
import Rivet from '../Rivet';
import { fetchPaginatedEvents } from '../actions';

const Home = (props) => {
  props.fetchPaginatedEvents(true);

  return (
    <section>
      <h1>home</h1>
    </section>
  );
}

Home.actionCreators = {
  fetchPaginatedEvents,
};

export default Rivet(Home);
