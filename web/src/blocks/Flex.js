import styled from 'styled-components';

export const FlexAcross = styled.div`
  ${props => props.theme.reset}

  display: flex;
  flex-direction: row;
`;

export const FlexHalfColumn = styled.div`
  ${props => props.theme.reset}

  display: flex;
  flex: 0 0 50%;
`;
