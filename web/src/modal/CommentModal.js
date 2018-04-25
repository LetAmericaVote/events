import React from 'react';
import Rivet from '../hoc/Rivet';
import Thread from '../components/Thread';
import SignupButton from '../components/SignupButton';
import Spacer from '../blocks/Spacer';
import {
  ModalContainer,
  ModalSpacer,
  ModalHeader,
} from './BaseModal';
import {
  Paragraph,
} from '../blocks/Type';
import {
  FlexAcrossJustifyCenter,
} from '../blocks/Flex';
import {
  selectEventIdBySlug,
  selectIsAuthenticated,
} from '../selectors';

const CommentModal = (props) => {
  const {
    commentId,
    eventId,
    isAuthenticated,
  } = props;

  if (! isAuthenticated && eventId) {
    return (
      <ModalContainer>
        <ModalSpacer>
          <ModalHeader>This comment is private</ModalHeader>
          <Spacer />
          <Paragraph>You must be signed up for this voting rights house party to view what the community is saying.</Paragraph>
          <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Paragraph>
          <FlexAcrossJustifyCenter>
            <SignupButton eventId={eventId} />
          </FlexAcrossJustifyCenter>
        </ModalSpacer>
      </ModalContainer>
    );
  }

  return (
    <ModalContainer>
      <Thread
        modalView
        commentId={commentId}
        eventId={eventId}
      />
    </ModalContainer>
  );
}

CommentModal.mapStateToProps = (state, ownProps) => ({
  eventId: selectEventIdBySlug(ownProps.eventSlug, state),
  isAuthenticated: selectIsAuthenticated(state),
});

export default Rivet(CommentModal);
