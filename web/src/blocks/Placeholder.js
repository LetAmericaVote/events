import styled from 'styled-components';

const darkerGrey = `background-color: #AAAAAA`;

const PlaceholderBase = styled.div`
  ${props => props.theme.reset}
  ${props => props.darken ? darkerGrey : props.theme.bg.paper}

  ${props => props.indent ? props.theme.baseMarginHorizontal : ''}
  ${props => props.leftIndent ? props.theme.baseMarginLeft : ''}
  ${props => props.bottomSpacing ? props.theme.tinyMarginBottom : ''}
`;

export const PlaceholderSquare = styled(PlaceholderBase)`
  width: ${props => props.width || '128px'};
  height: ${props => props.height || '128px'};
`;

export const PlaceholderRect = styled(PlaceholderBase)`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || `${props.theme.baseSpacing / 2}px`};
`;

export const PlaceholderRectContainer = styled(PlaceholderRect)`
  ${props => props.theme.bg.cloud}
  ${props => props.theme.borderRadius}
  ${props => props.theme.tinyPadding}
  overflow: hidden;
`;

export const PlaceholderCircle = styled(PlaceholderBase)`
  width: ${props => props.width || '32px'};
  height: ${props => props.height || '32px'};

  border-radius: 50%;
`;
