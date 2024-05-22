import { login } from "../firebase"
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom"
import { AppLayout, CategoryForm, LoginForm, VideoForm } from "../components"

const Routes = () => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={!login.isLogged ? "not logged" : "logged"} />
          <Route path="login" element={!login.isLogged ? <LoginForm /> : <Navigate to="/" />} />
          <Route path="login_confirmation" element={!login.isLogged ? <LoginForm /> : <Navigate to="/" />} />
          <Route path="new_video" element={!login.isLogged ? <Navigate to="/" /> : <VideoForm />} />
          <Route path="edit_video" element={!login.isLogged ? <Navigate to="/" /> : <VideoForm isEditRoute />} />
          <Route path="new_category" element={!login.isLogged ? <Navigate to="/" /> : <CategoryForm />} />
          <Route path="edit_category" element={!login.isLogged ? <Navigate to="/" /> : <CategoryForm isEditRoute />} />
          <Route path="*" element="not found" />
        </Route>
      </RouterRoutes>
    </BrowserRouter>
  )
}

export default Routes
