import { screenNames, ScreenName } from "../screen"

export const smallerThanScreen = (
  currentScreen: ScreenName,
  screen: ScreenName,
  inclusive: boolean = false
) => {
  const currentIndex = screenNames.indexOf(currentScreen)
  const index = screenNames.indexOf(screen)

  return inclusive ? currentIndex <= index : currentIndex < index
}

export const largerThanScreen = (
  currentScreen: ScreenName,
  screen: ScreenName,
  inclusive: boolean = false
) => {
  const currentIndex = screenNames.indexOf(currentScreen)
  const index = screenNames.indexOf(screen)

  return inclusive ? currentIndex >= index : currentIndex > index
}

export const betweenScreens = (
  currentScreen: ScreenName,
  screens: [ScreenName, ScreenName],
  inclusive: boolean = false
) => {
  const currentIndex = screenNames.indexOf(currentScreen)
  const indices = screens.map((screen) => screenNames.indexOf(screen))
  const smallerIndex = Math.min(...indices)
  const largerIndex = Math.max(...indices)

  return inclusive
    ? currentIndex >= smallerIndex && currentIndex <= largerIndex
    : currentIndex > smallerIndex && currentIndex < largerIndex
}
