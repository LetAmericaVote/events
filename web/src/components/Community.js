import React from 'react';
import Rivet from '../hoc/Rivet';
import Thread from './Thread';
import WriteComment from './WriteComment';
import CommunityContainer from '../blocks/CommunityContainer';
import HouseParty from '../blocks/HouseParty';
import {
  Header,
  Paragraph,
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
  selectEventRemainingTopLevelComments,
} from '../selectors';
import {
  COMMUNITY_TITLE,
} from '../copy';

const Community = (props) => {
  const {
    topLevelComments,
    remainingComments,
    fetchPaginatedComments,
    eventId,
  } = props;

  const loadMoreComments = () =>
    fetchPaginatedComments(-1, eventId, null, 'top', 5);

  return (
    <FlexDown>
      <Header>{COMMUNITY_TITLE}</Header>
      <CommunityContainer>
        <Paragraph>Share something with the community</Paragraph>
        <WriteComment eventId={eventId} />
      </CommunityContainer>
      {topLevelComments.map(comment =>
        <Thread key={comment.id} commentId={comment.id} eventId={eventId} />
      )}
      {remainingComments ? (
        <FlexAcrossJustifyCenter>
          <SecondaryCallToAction
            onClick={loadMoreComments}
          >View more comments</SecondaryCallToAction>
        </FlexAcrossJustifyCenter>
      ) : (
        <FlexDown>
          <FlexAcrossJustifyCenter>
            {(! topLevelComments || ! topLevelComments.length) ? (
              <Paragraph>Be the first to comment!</Paragraph>
            ) : (
              <Paragraph>You've reached the end!</Paragraph>
            )}
          </FlexAcrossJustifyCenter>
          <HouseParty />
        </FlexDown>
      )}
    </FlexDown>
  );
};

Community.mapStateToProps = (state, ownProps) => ({
  topLevelComments: selectTopLevelCommentsForEventSortedByRecent(ownProps.eventId, state),
  remainingComments: selectEventRemainingTopLevelComments(ownProps.eventId || 'community', state),
});

Community.actionCreators = {
  fetchPaginatedComments,
};

export default Rivet(Community);
