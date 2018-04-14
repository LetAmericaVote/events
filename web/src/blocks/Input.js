import styled from 'styled-components';
import { FlexAcross } from './Flex';

export const TextInputContainer = styled(FlexAcross)`
  ${props => props.theme.reset}

  ${props => props.theme.defaultBorderStyle}
  ${props => props.theme.borderRadius}
`;

export const TextInput = styled.input`
  ${props => props.theme.reset}

  flex-grow: 1;

  font-family: ${props => props.theme.regularFontFamily}
  font-size: ${props => props.theme.regularFontSize}

  ${props => props.theme.basePaddingHorizontal}
  ${props => props.theme.tinyPaddingVertical}
`;
