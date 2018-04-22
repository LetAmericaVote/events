import React from 'react';
import Rivet from '../hoc/Rivet';
import Punch from '../blocks/Punch';
import SignupButton from './SignupButton';
import FaceRow from './FaceRow';
import { InvertedSectionHeader } from '../blocks/Type';
import { FlexAcrossJustifyCenter } from '../blocks/Flex';
import {
  selectSignupsForEventSortedByCreatedAt,
} from '../selectors';

const Signup = (props) => {
  const {
    signups,
    eventId,
  } = props;

  const copy = signups.length < 5 ?
    'Be one of the first in your community to join this house party!' :
    `Join ${signups.length > 25 ? `over ${signups.length}` : signups.length} local activists in your community to help defend our democracy.`;

  return (
    <Punch>
      <InvertedSectionHeader centered>{copy}</InvertedSectionHeader>
      <FaceRow userIds={signups.map(signup => signup.user.id || signup.user)} />
      <FlexAcrossJustifyCenter>
        {/* <SignupButton eventId={eventId} /> */}
      </FlexAcrossJustifyCenter>
    </Punch>
  );
};

Signup.mapStateToProps = (state, ownProps) => ({
  signups: selectSignupsForEventSortedByCreatedAt(ownProps.eventId, state),
});

export default Rivet(Signup);
