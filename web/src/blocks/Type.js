import styled from 'styled-components';

export const SectionHeader = styled.h1`
  ${props => props.theme.reset}

  ${props => props.theme.fg.secondary}

  font-family: ${props => props.theme.regularFontFamily};
  font-size: ${props => props.theme.largeFontSize};
  font-weight: 900;

  ${props => props.theme.baseMarginBottom}
`;
