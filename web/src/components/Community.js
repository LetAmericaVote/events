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
// import {
//   fetchPaginatedEventComments,
// } from '../actions';
import {
  selectTopLevelCommentsForEventSortedByRecent,
} from '../selectors';
import {
  COMMUNITY_TITLE,
} from '../copy';

const Community = (props) => {
  const {
    loadMoreComments,
    topLevelComments,
  } = props;

  // fetchPaginatedEventComments(eventId, true, null);

  return (
    <FlexDown>
      <Header>{COMMUNITY_TITLE}</Header>
      {topLevelComments.map(comment => <p>{comment.id}</p>)}
      <FlexAcrossJustifyCenter>
        <SecondaryCallToAction
          onClick={loadMoreComments}
        >Load more comments</SecondaryCallToAction>
      </FlexAcrossJustifyCenter>
    </FlexDown>
  );
};

Community.mapStateToProps = (state, ownProps) => ({
  topLevelComments: selectTopLevelCommentsForEventSortedByRecent(ownProps.eventId, state),
});

// Community.actionCreators = {
//   fetchPaginatedEventComments,
// };

export default Rivet(Community);
