export interface Screen<T = number> {
  mobileSmall: T
  mobile: T
  mobileLarge: T
  tabletSmall: T
  tablet: T
  tabletLarge: T
  laptop: T
  desktop: T
  desktopLarge: T
  desktopLarger: T
  desktopLargest: T
}

export type ScreenName = keyof Screen

export const screenTokens: Screen = {
  mobileSmall: 320,
  mobile: 375,
  mobileLarge: 440,
  tabletSmall: 620,
  tablet: 740,
  tabletLarge: 880,
  laptop: 1040,
  desktop: 1240,
  desktopLarge: 1440,
  desktopLarger: 1680,
  desktopLargest: 1820,
}

export const screenNames: ScreenName[] = Object.keys(
  screenTokens
) as ScreenName[]

export const screenMediaQueries: Screen<string> = screenNames.reduce(
  (values, name) => {
    values[name] = `(min-width: ${screenTokens[name]}px)`

    return values
  },
  {}
) as Screen<string>
