import React from 'react';
import styled from 'styled-components';
import Rivet from '../hoc/Rivet';
import Byline from './Byline';
import ThreadReply from './ThreadReply';
import Spacer from '../blocks/Spacer';
import {
  ReplyIcon,
  ShareIcon,
} from '../blocks/Icons';
import {
  MenuButton,
} from '../blocks/Button';
import {
  Paragraph,
  Detail,
} from '../blocks/Type';
import {
  FlexAcross,
  FlexAcrossWrap,
} from '../blocks/Flex';
import {
  selectCommentExists,
  selectCommentUserId,
  selectCommentCreatedAt,
  selectCommentMessage,
  selectEventTitle,
  selectRepliesForCommentSortedByRecent,
} from '../selectors';
import {
  fetchComment,
  fetchPaginatedEventComments,
} from '../actions';

const StyledThread = styled.div`
  ${props => props.theme.reset}

  ${props => props.theme.bg.rainCloud}
  ${props => props.theme.borderRadius}

  ${props => props.theme.basePadding}

  ${props => props.theme.baseMarginBottom}
`;

const Thread = (props) => {
  const {
    userId,
    createdAt,
    message,
    eventTitle,
    replies,
  } = props;

  // TODO: Handle flag.
  // TODO: Display comment replies.
  // TODO: Display dropdown menu
  //   - edit
  //   - edit history
  //   - delete (user only)
  //   - flag (admin // host only)

  const hoursSince = Math.floor((Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60));
  const formattedTime = createdAt ? (
    new Date(createdAt).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
  ) : '';

  const tagline = `Posted in ${eventTitle ? `"${eventTitle}"` : 'the community'} ${hoursSince <= 12 ? `${hoursSince} hours ago` : `at ${formattedTime}`}.`;

  const buttons = [
    <MenuButton rightIndent key="reply">
      <FlexAcross>
        <ReplyIcon />
        <Detail indent>Reply</Detail>
      </FlexAcross>
    </MenuButton>,
    <MenuButton rightIndent key="share">
      <FlexAcross>
        <ShareIcon />
        <Detail indent>Share</Detail>
      </FlexAcross>
    </MenuButton>,
  ];

  return (
    <StyledThread>
      <Byline userId={userId} tagline={tagline} />
      <Spacer />
      <Paragraph>{message}</Paragraph>
      <FlexAcross>
        {buttons}
      </FlexAcross>
      <Spacer />
      <FlexAcrossWrap>
        {replies.map(reply =>
          <ThreadReply key={reply.id} commentId={reply.id} />)}
      </FlexAcrossWrap>
    </StyledThread>
  );
};

Thread.mapStateToProps = (state, ownProps) => ({
  userId: selectCommentUserId(ownProps.commentId, state),
  createdAt: selectCommentCreatedAt(ownProps.commentId, state),
  message: selectCommentMessage(ownProps.commentId, state),
  eventTitle: selectEventTitle(ownProps.eventId, state),
  replies: selectRepliesForCommentSortedByRecent(ownProps.commentId, state),
});

export default Rivet(Thread);
