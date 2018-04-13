export const baseSpacing = 24;

export const increments = [
  { name: 'superLarge', multiplier: 5 },
  { name: 'extraLarge', multiplier: 4 },
  { name: 'large', multiplier: 3 },
  { name: 'medium', multiplier: 2 },
  { name: 'base', multiplier: 1 },
  { name: 'small', multiplier: 0.75 },
  { name: 'tiny', multiplier: 0.5 },
  { name: 'extraTiny', multiplier: 0.25 },
];

const spacingTypes = [
  { name: 'Padding', property: 'padding' },
  { name: 'Margin', property: 'margin' },
].reduce((acc, spacingType) => {
  const modifiers = [
    {
      name: `${spacingType.name}Top`,
      style: value => `${spacingType.property}-top: ${value};`
    },
    {
      name: `${spacingType.name}Bottom`,
      style: value => `${spacingType.property}-bottom: ${value};`
    },
    {
      name: `${spacingType.name}Left`,
      style: value => `${spacingType.property}-Left: ${value};`
    },
    {
      name: `${spacingType.name}Right`,
      style: value => `${spacingType.property}-right: ${value};`
    },
    {
      name: `${spacingType.name}Vertical`,
      style: value => `
        ${spacingType.property}-top: ${value};
        ${spacingType.property}-bottom: ${value};
      `
    },
    {
      name: `${spacingType.name}Horizontal`,
      style: value => `
        ${spacingType.property}-left: ${value};
        ${spacingType.property}-right: ${value};
      `
    },
  ];

  return [
    ...acc,
    {
      name: spacingType.name,
      style: value => `${spacingType.property}: ${value};`,
    },
    ...modifiers,
  ];
}, []);

const spacing = increments.reduce((acc, increment) => {
  spacingTypes.forEach(spacer => {
    const value = spacer.style(`${increment.multiplier * baseSpacing}px`);
    acc[`${increment.name}${spacer.name}`] = value;
  });

  return acc;
}, {
  baseSpacing,
});

export default spacing;
