import { useNavigate } from "react-router-dom"
import { usePaths } from "./usePaths"
import { login } from "../firebase"
import { NavigationButton } from "../types"

export const useNavigationButton = () => {
  const navigate = useNavigate()
  const { home, login: loginPath, newVideo, newCategory } = usePaths()

  const navigationButton = {} as NavigationButton

  if (home.isCurrentPath) {
    navigationButton.href = !login.isLogged ? loginPath.path : newVideo.path
    navigationButton.text = !login.isLogged ? loginPath.name : newVideo.name
  }

  if (newVideo.isCurrentPath) {
    navigationButton.href = newCategory.path
    navigationButton.text = newCategory.name
  }

  if (newCategory.isCurrentPath) {
    navigationButton.href = newVideo.path
    navigationButton.text = newVideo.name
  }

  if (navigationButton.href) {
    navigationButton.isValid = true
    navigationButton.navigate = () => navigate(navigationButton.href)
  }

  return navigationButton
}
