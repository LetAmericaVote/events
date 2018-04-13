export const primaryColor = '#21c2de';
export const secondaryColor = '#072c34';
export const actionColor = '#ff4c4d';

export const nightColor = '#000000';
export const paperColor = '#ffffff';
export const cloudColor = '#cccccc';

const colorVariables = [
  { name: 'primary', color: primaryColor },
  { name: 'secondary', color: secondaryColor },
  { name: 'action', color: actionColor },
  { name: 'night', color: nightColor },
  { name: 'paper', color: paperColor },
  { name: 'cloud', color: cloudColor },
];

const reducedColors = colorVariables.reduce((acc, pair) => {
  acc[pair.name] = pair.color;

  return acc;
}, {});

function reduceColors(onReduce) {
  return colorVariables.reduce((acc, pair) => {
    const { name, color } = pair;
    acc[name] = onReduce(color);

    return acc;
  }, {});
}

const colors = {
  fg: reduceColors(color => `color: ${color};`),
  bg: reduceColors(color => `background-color: ${color};`),
  ...reducedColors,
};

export default colors;
