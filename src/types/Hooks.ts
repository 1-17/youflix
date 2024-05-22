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
  isCurrentPath: boolean,
  name: string,
  path: string
}>

// useNavigationButton
export type NavigationButton = {
  href: string
  text: string
  isValid: boolean
  navigate: React.MouseEventHandler<HTMLButtonElement>
}
