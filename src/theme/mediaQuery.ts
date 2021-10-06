export type TScreenType = `small` | `medium` | `large`;

export const ScreenTypes = {
  small: `small` as TScreenType,
  medium: `medium` as TScreenType,
  large: `large` as TScreenType,
};

const ScreenTypeQuery: Map<TScreenType, string> = new Map([
  [`small`, `(max-width: 650px)`],
  [`medium`, `(max-width: 1199px)`],
  [`large`, `(min-width: 1200px)`],
]);

export const mediaQuery = {
  smallScreen: `@media screen and ${ScreenTypeQuery.get(`small`)}`,
  mediumScreen: `@media screen and ${ScreenTypeQuery.get(`medium`)}`,
  largeScreen: `@media screen and ${ScreenTypeQuery.get(`large`)}`,
};

export const calcCurrentMediaType = (): TScreenType => {
  for (const [type, query] of ScreenTypeQuery) {
    if (window.matchMedia(query).matches) {
      return type;
    }
  }
  return ScreenTypes.small;
};
