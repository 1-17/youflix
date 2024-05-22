// usePaths
type RoutesNames =
  "home" |
  "login" |
  "loginConfirmation" |
  "newVideo" |
  "editVideo" |
  "newCategory" |
  "editCategory" |
  "notFound"

export type Paths = Record<RoutesNames, {
  path: string
  name: string
  isCurrentPath: boolean
}>

// useNavigationButton
export type NavigationButton = {
  href: string
  text: string
  isValid: boolean
  navigate: React.MouseEventHandler<HTMLButtonElement>
}
