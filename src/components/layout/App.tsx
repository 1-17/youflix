
import Mui from "../../mui"
import Routes from "../../routes"
import AppBar from "./AppBar"

export const App = () => {
  return (
    <Mui>
      <Routes wrapper={<AppBar />} />
    </Mui>
  )
}
