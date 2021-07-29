// Small tablets and large smartphones (landscape view)
const screenSmallMin = 576;

// Small tablets (portrait view)
const screenMediumMin = 768;

// Tablets and small desktops
const screenLargeMin = 992;

// Large tablets and desktops
const screenExtraLargeMin = 1200;

const customMediaQuery = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}px)`;

export const screen = {
  custom: customMediaQuery,
  small: customMediaQuery(screenSmallMin),
  medium: customMediaQuery(screenMediumMin),
  large: customMediaQuery(screenLargeMin),
  extraLarge: customMediaQuery(screenExtraLargeMin),
};
