import styled from 'styled-components';

export const FlexAcross = styled.div`
  ${props => props.theme.reset}

  display: flex;
  flex-direction: row;

  ${props => props.useMargin ? props.theme.baseMarginBottom : ''}
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

export const FlexDown = styled.div`
  ${props => props.theme.reset}

  display: flex;
  flex-direction: column;
`;

export const FlexHalfColumn = styled.div`
  ${props => props.theme.reset}

  display: flex;
  flex: 0 0 calc(50% - ${props => props.theme.baseSpacing}px);
`;

export const FlexResponsiveHalfColumn = styled.div`
  ${props => props.theme.reset}

  display: flex;
  flex: 0 0 100%;

  ${props => props.useMargin ? props.theme.baseMarginBottom : ''}

  ${props => props.theme.tablet`
    flex: 0 0 calc(50% - ${props => props.theme.baseSpacing}px);

    ${props => props.useMargin ? 'margin-bottom: 0' : ''}
  `}
`;

export const FlexResponsiveRow = styled.div`
  ${props => props.theme.reset}

  display: flex;
  flex-direction: column;
  width: 100%;

  ${props => props.theme.tablet`
    flex-direction: row;
    justify-content: space-between;
  `}
`;
