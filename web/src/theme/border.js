import { actionColor, cloudColor } from './colors';

const borderRadiusValue = '4px';

const borderRadius = `border-radius: ${borderRadiusValue};`;

const defaultBorderStyle = `
  border: 1px solid ${cloudColor};
`;

const actionBorderStyle = `
  border: 1px solid ${actionColor};
`;

const border = {
  borderRadius,
  borderRadiusValue,
  actionBorderStyle,
  defaultBorderStyle,
};

export default border;
