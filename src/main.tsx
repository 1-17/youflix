import React from "react"
import ReactDOM from "react-dom/client"
import { initFirebase } from "./firebase"
import Mui from "./mui"
import Routes from "./routes"

initFirebase()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Mui>
      <Routes />
    </Mui>
  </React.StrictMode>,
)
