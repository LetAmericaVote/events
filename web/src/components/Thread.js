import React from 'react';
import Rivet from '../hoc/Rivet';
import Byline from './Byline';
import ThreadReply from './ThreadReply';
import WriteComment from './WriteComment';
import Spacer from '../blocks/Spacer';
import CommunityContainer from '../blocks/CommunityContainer';
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
  FlexAcrossJustifyCenter,
} from '../blocks/Flex';
import {
  selectCommentUserId,
  selectCommentCreatedAt,
  selectCommentMessage,
  selectEventTitle,
  selectRepliesForCommentSortedByRecent,
  selectIsCommentFlagged,
  selectFormValue,
} from '../selectors';
import {
  fetchPaginatedComments,
  setFormValue,
} from '../actions';

const Thread = (props) => {
  const {
    userId,
    createdAt,
    message,
    eventTitle,
    replies,
    fetchPaginatedComments,
    eventId,
    commentId,
    isFlagged,
    showReplyBox,
    setFormValue,
  } = props;

  // TODO: Handle 0 hours (aka use minutes)
  // TODO: Display dropdown menu --> open same thread modal?
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

  const showReply = () => setFormValue('reply', commentId, true);

  const buttons = [
    <MenuButton rightIndent key="reply" onClick={showReply}>
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

  const onViewMoreReplies = () =>
    fetchPaginatedComments(-1, eventId, null, commentId, 10);

  return (
    <CommunityContainer isFlagged={isFlagged}>
      <Byline userId={userId} tagline={tagline} />
      <Spacer />
      <Paragraph>{message}</Paragraph>
      <FlexAcross>
        {buttons}
      </FlexAcross>
      {showReplyBox ? [
        <Spacer key="spacer" />,
        <WriteComment
          key="reply"
          inReplyToId={commentId}
          eventId={eventId}
        />
      ] : null}
      <Spacer />
      <FlexAcrossWrap>
        {replies.map(reply =>
          <ThreadReply key={reply.id} commentId={reply.id} />)}
      </FlexAcrossWrap>
      <MenuButton fill onClick={onViewMoreReplies}>
        <FlexAcrossJustifyCenter>
          <Detail>View More Replies</Detail>
        </FlexAcrossJustifyCenter>
      </MenuButton>
    </CommunityContainer>
  );
};

Thread.mapStateToProps = (state, ownProps) => ({
  userId: selectCommentUserId(ownProps.commentId, state),
  createdAt: selectCommentCreatedAt(ownProps.commentId, state),
  message: selectCommentMessage(ownProps.commentId, state),
  eventTitle: selectEventTitle(ownProps.eventId, state),
  replies: selectRepliesForCommentSortedByRecent(ownProps.commentId, state),
  isFlagged: selectIsCommentFlagged(ownProps.commentId, state),
  showReplyBox: selectFormValue('reply', ownProps.commentId, state),
});

Thread.actionCreators = {
  fetchPaginatedComments,
  setFormValue,
};

export default Rivet(Thread);
