import { actionColor, cloudColor } from './colors';

const borderRadius = 'border-radius: 4px';

const defaultBorderStyle = `
  border: 1px solid ${cloudColor};
`;

const actionBorderStyle = `
  border: 1px solid ${actionColor};
`;

const border = {
  borderRadius,
  actionBorderStyle,
  defaultBorderStyle,
};

export default border;
