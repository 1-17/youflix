import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom"
import Login from "./Login"

type RoutesProps = {
  wrapper: React.ReactNode
}

const Routes = ({ wrapper }: RoutesProps) => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path="/" element={wrapper}>
          <Route index element="home" />
          <Route path="login" element={<Login />} />
          <Route path="new_video" element="new video" />
          <Route path="new_category" element="new category" />
          <Route path="*" element="not found" />
        </Route>
      </RouterRoutes>
    </BrowserRouter>
  )
}

export default Routes
