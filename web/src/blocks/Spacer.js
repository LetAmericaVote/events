import styled from 'styled-components';

const Spacer = styled.div`
  ${props => props.theme.reset}
  ${props => props.theme.baseMarginBottom}

  ${props => props.extraLarge ? props.theme.extraLargeMarginBottom : ''}
  ${props => props.large ? props.theme.largeMarginBottom : ''}
  ${props => props.medium ? props.theme.mediumMarginBottom : ''}
`;

export default Spacer;
