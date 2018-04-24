import React from 'react';
import Rivet from '../hoc/Rivet';
import {
  Header,
} from '../blocks/Type';
import {
  SecondaryCallToAction,
} from '../blocks/Button';
import {
  FlexDown,
  FlexAcrossJustifyCenter,
} from '../blocks/Flex';
import {
  fetchPaginatedComments,
} from '../actions';
import {
  selectTopLevelCommentsForEventSortedByRecent,
} from '../selectors';
import {
  COMMUNITY_TITLE,
} from '../copy';

const Community = (props) => {
  const {
    topLevelComments,
    fetchPaginatedComments,
  } = props;

  // fetchPaginatedComments(eventId, true, null);

  return (
    <FlexDown>
      <Header>{COMMUNITY_TITLE}</Header>
      {topLevelComments.map(comment => <p>{comment.id}</p>)}
      <FlexAcrossJustifyCenter>
        <SecondaryCallToAction
          onClick={null}
        >Load more comments</SecondaryCallToAction>
      </FlexAcrossJustifyCenter>
    </FlexDown>
  );
};

Community.mapStateToProps = (state, ownProps) => ({
  topLevelComments: selectTopLevelCommentsForEventSortedByRecent(ownProps.eventId, state),
});

Community.actionCreators = {
  fetchPaginatedComments,
};

export default Rivet(Community);
