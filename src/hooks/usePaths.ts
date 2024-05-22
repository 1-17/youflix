import { useLocation } from "react-router-dom"
import { Paths } from "../types"

export const usePaths = () => {
  const { pathname } = useLocation()

  const paths = {
    home: { path: "/", name: "Home" },
    login: { path: "/login" },
    loginConfirmation: { path: "/login_confirmation" },
    newVideo: { path: "/new_video" },
    editVideo: { path: "/edit_video" },
    newCategory: { path: "/new_category" },
    editCategory: { path: "/edit_category" },
    notFound: { path: "*", name: "Not Found" }
  } as Paths

  let currentName: string = ""

  for (const key of Object.keys(paths)) {
    const pathKey = paths[key as keyof typeof paths]
    const formattedPath = pathKey.path.replace("/", "").replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())

    if (!pathKey.name) {
      pathKey.name = formattedPath
    }

    pathKey.isCurrentPath = pathname === pathKey.path

    if (pathKey.isCurrentPath) {
      currentName = pathKey.name
    }
  }
  
  return { ...paths, currentName }
}
