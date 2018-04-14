import styled from 'styled-components';

export const FlexAcross = styled.div`
  ${props => props.theme.reset}

  display: flex;
  flex-direction: row;
`;

export const FlexAcrossSpaceBetween = styled(FlexAcross)`
  justify-content: space-between;
`;

export const FlexAcrossSpaceEvenly = styled(FlexAcross)`
  justify-content: space-evenly;
`;

export const FlexAcrossAlignCenter = styled(FlexAcross)`
  align-items: center;
`;

export const FlexHalfColumn = styled.div`
  ${props => props.theme.reset}

  display: flex;
  flex: 0 0 50%;
`;
