import React from 'react';
import styled from 'styled-components';
import Rivet from '../hoc/Rivet';
import Face from './Face';
import {
  Paragraph,
} from '../blocks/Type';
import {
  FlexAcross,
} from '../blocks/Flex';
import {
  selectCommentExists,
  selectCommentUserId,
  selectCommentMessage,
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
  ${props => props.theme.defaultBorderStyle}

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
  } = props;

  if (! exists) {
    return null;
  }

  return (
    <ThreadReplyContainer>
      <FlexAcross>
        <Face userId={userId} indent />
        <ReplyType>{message}</ReplyType>
      </FlexAcross>
    </ThreadReplyContainer>
  );
};

ThreadReply.mapStateToProps = (state, ownProps) => ({
  exists: selectCommentExists(ownProps.commentId, state),
  userId: selectCommentUserId(ownProps.commentId, state),
  message: selectCommentMessage(ownProps.commentId, state),
});

export default Rivet(ThreadReply);
