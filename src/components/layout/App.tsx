import firebaseApp from "../../firebase"
import Mui from "../../mui"
import Routes from "../../routes"
import AppBar from "./AppBar"

export const App = () => {
  firebaseApp

  return (
    <Mui>
      <Routes wrapper={<AppBar />} />
    </Mui>
  )
}
