import React from 'react';
import styled from 'styled-components';
import Rivet from '../hoc/Rivet';
import { fetchUserById } from '../actions';
import {
  selectUserExists,
  selectUserProfilePhoto,
} from '../selectors';

export const FaceStyled = styled.div`
  ${props => props.theme.reset}

  width: 32px;
  height: 32px;

  background-size: cover;
  background-image: url(${props => props.src});

  ${props => props.indent ? props.theme.smallMarginRight : ''}
  ${props => props.negativeIndent ? 'margin-right: -4px;' : ''}

  border-radius: 50%;
  border: 2px solid ${props => props.theme.paper};
`;

const Face = (props) => {
  const {
    userExists,
    profilePhoto,
    indent,
    negativeIndent,
  } = props;

  if (! userExists || ! profilePhoto) {
    return null;
  }

  return (
    <FaceStyled
      src={profilePhoto}
      negativeIndent={negativeIndent}
      indent={indent}
    />
  );
};

Face.mapStateToProps = (state, ownProps) => ({
  userExists: selectUserExists(ownProps.userId, state),
  profilePhoto: selectUserProfilePhoto(ownProps.userId, state),
});

class FaceConnector extends React.Component {
  constructor(props) {
    super(props);

    this.fetchUser = this.fetchUser.bind(this);
  }

  fetchUser() {
    this.props.fetchUserById(this.props.userId);
  }

  componentDidMount() {
    if (!!this.props.userId) {
      this.fetchUser();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!!this.userId && !prevProps.userId) {
      this.fetchUser();
    }
  }

  render() {
    const WrappedFace = Rivet(Face);

    return (
      <WrappedFace {...this.props} />
    )
  }
}

FaceConnector.actionCreators = {
  fetchUserById,
};

export default Rivet(FaceConnector);
