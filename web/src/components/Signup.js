import React from 'react';
import styled from 'styled-components';
import Rivet from '../hoc/Rivet';
import Punch from '../blocks/Punch';
import { FlexAcross } from '../blocks/Flex';
import { GoogleIcon } from '../blocks/Icons';
import { InvertedSectionHeader } from '../blocks/Type';
import { SecondaryCallToAction } from '../blocks/Button';
import {
  selectSignupsForEventSortedByCreatedAt,
} from '../selectors';
import {
  fetchPaginatedEventSignups,
} from '../actions';

const FaceRow = styled.div`
  ${props => props.theme.reset}

  display: flex;
  flex-direction: row;

  flex-wrap: wrap;
  justify-content: center;
`;

const Face = styled.div`
  ${props => props.theme.reset}

  width: 32px;
  height: 32px;

  background-size: cover;
  background-image: url(${props => props.src});

  margin-right: -4px;

  border-radius: 50%;
  border: 2px solid ${props => props.theme.paper};
`;

const SignupButton = styled(SecondaryCallToAction)`
  ${props => props.theme.baseMarginTop}
  margin-left: auto;
  margin-right: auto;
`;

const Signup = (props) => {
  const {
    signups,
  } = props;

  const copy = signups.length < 5 ?
    'Be one of the first in your community to join this house party!' :
    `Join ${signups.length > 25 ? `over ${signups.length}` : signups.length} local activists in your community to help defend our democracy.`;

  return (
    <Punch>
      <InvertedSectionHeader>{copy}</InvertedSectionHeader>
      <FaceRow>
        {signups.map(signup => (
          <Face key={signup.user.id} src={signup.user.profilePhoto} />
        ))}
      </FaceRow>
      <SignupButton>
        <FlexAcross>
          <GoogleIcon />
          Sign Up With Google
        </FlexAcross>
      </SignupButton>
    </Punch>
  );
};

Signup.mapStateToProps = (state, ownProps) => ({
  signups: selectSignupsForEventSortedByCreatedAt(ownProps.eventId, state),
});

// TODO: Make this better...?
class SignupHack extends React.Component {
  constructor(props) {
    super(props);

    this.fetchSignups = this.fetchSignups.bind(this);
  }

  fetchSignups() {
    this.props.fetchPaginatedEventSignups(this.props.eventId, true);
  }

  componentDidMount() {
    if (!!this.props.eventId) {
      this.fetchSignups();
    }
  }

  componentDidRecieveProps(nextProps, prevProps) {
    if (!!nextProps.eventId && !prevProps.eventId) {
      this.fetchSignups();
    }
  }

  render() {
    const WrappedSignup = Rivet(Signup);

    return (
      <WrappedSignup {...this.props} />
    )
  }
}

SignupHack.actionCreators = {
  fetchPaginatedEventSignups,
};

export default Rivet(SignupHack);
