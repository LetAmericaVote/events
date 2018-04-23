import React from 'react';
import styled from 'styled-components';
import Face from './Face';

const FaceRowStyled = styled.div`
  ${props => props.theme.reset}

  display: flex;
  flex-direction: row;

  flex-wrap: wrap;
  justify-content: center;
`;

const FaceRow = (props) => {
  const { userIds } = props;

  return (
    <FaceRowStyled>
      {userIds.map(userId =>
        <Face key={userId} userId={userId} negativeIndent />
      )}
    </FaceRowStyled>
  );
};

export default FaceRow;
