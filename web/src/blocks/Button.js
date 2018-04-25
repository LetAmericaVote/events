import styled from 'styled-components';

export const CallToActionButton = styled.button`
  ${props => props.theme.reset}

  ${props => props.theme.bg.action}
  ${props => props.theme.fg.paper}

  font-family: ${props => props.theme.heavyFontFamily}
  font-size: ${props => props.theme.regularFontSize}

  text-transform: uppercase;

  ${props => props.theme.basePaddingHorizontal}
  ${props => props.theme.tinyPaddingVertical}

  ${props => props.theme.borderRadius}

  cursor: pointer;

  ${props => props.centered ? 'text-align: center;' : ''}
`;

export const SecondaryCallToAction = styled(CallToActionButton)`
  ${props => props.theme.fg.action}
  ${props => props.theme.bg.paper}
  ${props => props.theme.actionBorderStyle}

  &:disabled {
    ${props => props.theme.fg.cloud}
  }
`;

export const MenuButton = styled.button`
  ${props => props.theme.reset}

  ${props => props.theme.bg.paper}
  ${props => props.theme.fg.night}

  font-family: ${props => props.theme.regularFontFamily};
  font-size: ${props => props.theme.smallFontSize}

  ${props => props.fill ? 'width: 100%;' : ''}

  ${props => props.theme.tinyPaddingHorizontal}
  ${props => props.theme.extraTinyPaddingVertical}

  ${props => props.rightIndent ? props.theme.smallMarginRight : ''}

  ${props => props.theme.borderRadius}

  cursor: pointer;

  ${props => props.centered ? 'text-align: center;' : ''}
`;

export const ActionMenuButton = styled(MenuButton)`
  ${props => props.theme.bg.secondary}
  ${props => props.theme.fg.paper}
`;
