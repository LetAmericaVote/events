import React from 'react';
import styled from 'styled-components';
import Rivet from '../hoc/Rivet';
import Face from './Face';
import {
  Paragraph,
} from '../blocks/Type';
import {
  FlexAcrossAlignCenter,
} from '../blocks/Flex';
import {
  openCommentModal,
} from '../actions';
import {
  selectCommentExists,
  selectCommentUserId,
  selectCommentMessage,
  selectIsCommentFlagged,
  selectCommentEventId,
  selectEventSlug,
} from '../selectors';

const ReplyType = styled(Paragraph)`
  margin-bottom: 0;
`;

const ThreadReplyContainer = styled.div`
  ${props => props.theme.reset}

  ${props => props.theme.tinyPaddingHorizontal}
  ${props => props.theme.extraTinyPaddingVertical}

  ${props =>props.theme.smallMarginRight}

  ${props => props.theme.bg.paper}

  ${props => props.theme.borderRadius}
  ${props => props.isFlagged ? props.theme.actionBorderStyle : ''}

  ${props => props.theme.baseMarginBottom}

  width: 100%;

  cursor: pointer;

  ${props => props.theme.tablet`
    width: auto;
  `}
`;

const ThreadReply = (props) => {
  const {
    exists,
    userId,
    message,
    isFlagged,
    commentId,
    eventSlug,
    openCommentModal,
  } = props;

  if (! exists) {
    return null;
  }

  const onClick = () =>
    openCommentModal(commentId, eventSlug);

  return (
    <ThreadReplyContainer isFlagged={isFlagged} onClick={onClick}>
      <FlexAcrossAlignCenter>
        <Face userId={userId} indent />
        <ReplyType>{message}</ReplyType>
      </FlexAcrossAlignCenter>
    </ThreadReplyContainer>
  );
};

ThreadReply.mapStateToProps = (state, ownProps) => ({
  exists: selectCommentExists(ownProps.commentId, state),
  userId: selectCommentUserId(ownProps.commentId, state),
  message: selectCommentMessage(ownProps.commentId, state),
  isFlagged: selectIsCommentFlagged(ownProps.commentId, state),
  eventSlug: selectEventSlug(selectCommentEventId(ownProps.commentId, state), state),
});

ThreadReply.actionCreators = {
  openCommentModal,
};

export default Rivet(ThreadReply);
