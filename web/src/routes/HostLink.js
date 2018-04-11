import React from 'react';
import Rivet from '../hoc/Rivet';
import { setHostLink } from '../actions';

const HostLink = (props) => {
  const { hostCode, setHostLink } = props;

  setHostLink(hostCode);

  return (
    <p>...</p>
  );
}

HostLink.actionCreators = {
  setHostLink,
};

export default Rivet(HostLink);
