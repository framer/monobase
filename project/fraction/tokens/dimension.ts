import {
  createVariables,
  createVariablesFromArray,
  VariableScope,
} from "./utils"

export const dimension: Record<string, number> = {
  // Content
  sidebarWidth: 240,
  contentWidth: 700,
  containerWidth: 1000,
  containerLWidth: 1200,
  containerXLWidth: 1400,
  containerPadding: 20,

  // Navigation
  navigationBarHeight: 60,
  navigationBannerHeight: 32,

  // Input
  inputHeight: 26,
  inputHeightLarge: 30,
  inputRadius: 5,

  // Button
  buttonHeight: 52,
  buttonHeightSmall: 40,
  buttonRadius: 14,
  buttonRadiusSmall: 10,
  buttonPadding: 20,
  buttonPaddingSmall: 16,

  // Checkbox
  checkboxRadius: 8,
  checkboxRadiusSmall: 4,
  checkboxSize: 24,
  checkboxSizeSmall: 16,

  // Card
  cardRadius: 16,
  cardPadding: 36,
  cardPaddingS: 24,

  // Pivot
  pivotRadiusSmall: 16,
  pivotRadius: 20,
  pivotRadiusLarge: 24,

  // Search
  listRadius: 12,
  listItemRadius: 10,
  listPadding: 16,

  // Video
  videoPlayerRadius: 16,
  videoToolbarPadding: 16,

  // Form
  formSpacing: 8,

  // Modal
  modalWidth: 432,
  modalRadius: 20,

  // Notification
  notificationWidth: 380,
  notificationRadius: 14,
}

export const [dimensionVariables, dimensionValues] = createVariables(
  dimension,
  VariableScope.Dimensions,
  (variable) => `${variable}px`
)

export const width: number[] = [
  0,
  300,
  400,
  500,
  600,
  700,
  800,
  900,
  1000,
  1200,
  1400,
]

export const [widthVariables, widthValues] = createVariablesFromArray(
  width,
  VariableScope.Width,
  (variable) => `${variable}px`
)
