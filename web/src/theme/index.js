import colors from './colors';
import media from './media';
import reset from './reset';
import spacing from './spacing';

const theme = {
  ...colors,
  ...media,
  reset,
  ...spacing,
};

export default theme;
