import colors from './colors';
import font from './font';
import media from './media';
import reset from './reset';
import spacing from './spacing';

const theme = {
  ...colors,
  ...font,
  ...media,
  reset,
  ...spacing,
};

export default theme;
