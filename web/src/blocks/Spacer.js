import styled from 'styled-components';

const Spacer = styled.div`
  ${props => props.theme.reset}
  ${props => props.theme.baseMarginBottom}

  ${props => props.extraLarge ? props.theme.extraLargeMarginBottom : ''}
  ${props => props.large ? props.theme.largeMarginBottom : ''}
  ${props => props.medium ? props.theme.mediumMarginBottom : ''}
  ${props => props.small ? props.theme.smallMarginBottom : ''}
  ${props => props.tiny ? props.theme.tinyMarginBottom : ''}
`;

export default Spacer;
