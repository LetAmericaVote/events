import styled from 'styled-components';

export const Hero = styled.h1`
  ${props => props.theme.reset}

  ${props => props.theme.fg.night}

  text-align: center;

  font-family: ${props => props.theme.thinFontFamily};
  font-size: ${props => props.theme.heroFontSizeSmall};
  font-weight: 900;

  ${props => props.theme.mediumMarginBottom}

  ${props => props.theme.tablet`
    font-size: ${props => props.theme.heroFontSizeLarge};
  `}
`;

export const HeroHighlight = styled.span`
  ${props => props.theme.reset}

  display: inline;
  ${props => props.theme.fg.action}

  font-family: ${props => props.theme.heavyFontFamily};
  font-size: ${props => props.theme.heroFontSize};
  font-weight: 900;
`;

export const HeroBold = styled(Hero)`
  font-family: ${props => props.theme.heavyFontFamily};
  ${props => props.theme.fg.secondary}
`;

export const SectionHeader = styled.h1`
  ${props => props.theme.reset}

  ${props => props.theme.fg.secondary}

  font-family: ${props => props.theme.regularFontFamily};
  font-size: ${props => props.theme.largeFontSize};
  font-weight: 900;

  ${props => props.theme.baseMarginBottom}
`;

export const InvertedSectionHeader = styled(SectionHeader)`
  ${props => props.theme.fg.paper}
`;

export const Header = styled.h1`
  ${props => props.theme.reset}

  ${props => props.theme.fg.secondary}

  font-family: ${props => props.theme.heavyFontFamily};
  font-size: ${props => props.theme.largeFontSize};

  ${props => props.theme.baseMarginBottom}
`;

export const UnstyledAnchor = styled.a`
  ${props => props.theme.reset}
  cursor: pointer;
`;

export const Paragraph = styled.p`
  ${props => props.theme.reset}

  ${props => props.theme.fg.night}

  font-family: ${props => props.theme.regularFontFamily};
  font-size: ${props => props.theme.regularFontSize};

  ${props => props.centered ? 'text-align: center;' : ''}

  ${props => props.theme.baseMarginBottom}
`;

export const InvertedParagraph = styled(SectionHeader)`
  ${props => props.theme.fg.paper}
`;

export const Detail = styled.span`
  ${props => props.theme.reset}

  ${props => props.indent ? props.theme.extraTinyMarginLeft : ''}

  ${props => props.theme.fg.night}

  font-family: ${props => props.theme.regularFontFamily};
  font-size: ${props => props.enlarge ? props.theme.regularFontSize : props.theme.smallFontSize};
  font-weight: ${props => props.boldend ? 900 : 100};
`;
