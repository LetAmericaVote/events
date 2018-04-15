import styled from 'styled-components';
import {
  FlexDown,
  FlexAcross,
} from './Flex';

export const TextInputContainer = styled(FlexAcross)`
  ${props => props.theme.defaultBorderStyle}
  ${props => props.theme.borderRadius}
`;

export const TextInput = styled.input`
  ${props => props.theme.reset}

  flex-grow: 1;

  font-family: ${props => props.theme.regularFontFamily}
  font-size: ${props => props.theme.regularFontSize}

  ${props => props.indent ? props.theme.basePaddingHorizontal : props.theme.tinyPaddingHorizontal}
  ${props => props.theme.tinyPaddingVertical}
`;

export const FieldContainer = styled(FlexDown)`
  ${props => props.theme.baseMarginBottom}
`;

export const Label = styled.h6`
  ${props => props.theme.reset}

  ${props => props.theme.fg.night}

  font-family: ${props => props.theme.regularFontFamily};
  font-size: ${props => props.theme.smallFontSize};

  ${props => props.theme.extraTinyMarginBottom}
`;

export const LongTextInput = styled.textarea`
  ${props => props.theme.reset}

  ${props => props.theme.fg.night}

  font-family: ${props => props.theme.regularFontFamily}
  font-size: ${props => props.theme.regularFontSize}

  ${props => props.theme.tinyPadding}

  ${props => props.theme.defaultBorderStyle}
  ${props => props.theme.borderRadius}
`;

export const SelectInput = styled.select`
  ${props => props.theme.reset}

  ${props => props.theme.fg.night}

  font-family: ${props => props.theme.regularFontFamily}
  font-size: ${props => props.theme.regularFontSize}

  ${props => props.theme.tinyPadding}

  ${props => props.theme.defaultBorderStyle}
  ${props => props.theme.borderRadius}
`;
