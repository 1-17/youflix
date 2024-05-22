import { useLocation } from "react-router-dom"
import { Paths } from "../types"

export const usePaths = () => {
  const { pathname } = useLocation()

  const paths: Paths = {
    home: {
      isCurrentPath: false,
      name: "Home",
      path: "/"
    },
    login: {
      isCurrentPath: false,
      name: "Login",
      path: "/login"
    },
    loginConfirmation: {
      isCurrentPath: false,
      name: "Login Confirmation",
      path: "/login_confirmation"
    },
    newVideo: {
      isCurrentPath: false,
      name: "New Video",
      path: "/new_video"
    },
    editVideo: {
      isCurrentPath: false,
      name: "Edit Video",
      path: "/edit_video"
    },
    newCategory: {
      isCurrentPath: false,
      name: "New Category",
      path: "/new_category"
    },
    editCategory: {
      isCurrentPath: false,
      name: "Edit Category",
      path: "/edit_category"
    },
    notFound: {
      isCurrentPath: false,
      name: "Not Found",
      path: "*"
    }
  }

  for (const key of Object.keys(paths)) {
    const path = paths[key as keyof typeof paths]
    path.isCurrentPath = pathname === path.path
  }

  return paths
}
