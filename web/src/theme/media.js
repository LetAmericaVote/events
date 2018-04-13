import { css } from 'styled-components';

const breakpoints = {
  mobileSmall: `320px`,
  mobileLarge: `425px`,
  tablet: `768px`,
  desktopSmall: `1024px`,
  desktopLarge: `1440px`,
  '4k': `2560px`,
};

const queries = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${breakpoints[label]}) {
     ${css(...args)}
    }
  `;

  return acc
}, {});

const media = {
  ...queries,
  breakpoints,
};

export default media;
