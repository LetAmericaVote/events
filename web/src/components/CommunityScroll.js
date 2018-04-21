import React from 'react';
import Rivet from '../hoc/Rivet';
import Byline from './Byline';
import {
  selectUsersAsArray,
} from '../selectors';

const CommunityScroll = (props) => {
  const { users } = props;

  if (! users || ! users.length) {
    return null;
  }

  return (
    null
  );
}

CommunityScroll.mapStateToProps = (state) => ({
  users: selectUsersAsArray(state),
});

export default Rivet(CommunityScroll);
