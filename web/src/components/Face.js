import React from 'react';
import styled from 'styled-components';
import Rivet from '../hoc/Rivet';
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

export default Rivet(Face);
