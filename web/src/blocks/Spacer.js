import styled from 'styled-components';

const Spacer = styled.div`
  ${props => props.theme.reset}
  ${props => props.large ? props.theme.largeMarginBottom : props.theme.baseMarginBottom}
  ${props => props.medium ? props.theme.largeMarginBottom : props.theme.mediumMarginBottom}
`;

export default Spacer;
