import styled from 'styled-components';

const CommunityContainer = styled.div`
  ${props => props.theme.reset}

  ${props => props.theme.bg.rainCloud}
  ${props => props.theme.borderRadius}

  ${props => props.isFlagged ? props.theme.actionBorderStyle : ''}

  ${props => props.theme.basePadding}

  ${props => props.theme.baseMarginBottom}
`;

export default CommunityContainer;
