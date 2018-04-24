import React from 'react';
import Rivet from '../hoc/Rivet';
import Thread from './Thread';
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
    eventId,
  } = props;

  const loadMoreComments = () =>
    fetchPaginatedComments(1, eventId, null, 'top', 5);

  return (
    <FlexDown>
      <Header>{COMMUNITY_TITLE}</Header>
      {topLevelComments.map(comment =>
        <Thread key={comment.id} commentId={comment.id} eventId={eventId} />
      )}
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

Community.actionCreators = {
  fetchPaginatedComments,
};

export default Rivet(Community);
