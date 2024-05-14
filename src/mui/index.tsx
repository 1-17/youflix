import { CssBaseline, ThemeProvider } from "@mui/material"
import theme from "./theme"

type MuiProps = {
  children: React.ReactNode
}

const Mui = ({ children }: MuiProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default Mui
