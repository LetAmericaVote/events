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
  selectCommentExists,
  selectCommentUserId,
  selectCommentMessage,
  selectIsCommentFlagged,
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
  } = props;

  if (! exists) {
    return null;
  }

  return (
    <ThreadReplyContainer isFlagged={isFlagged}>
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
});

export default Rivet(ThreadReply);
