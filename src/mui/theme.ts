import { createTheme } from "@mui/material"

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#dc1a28"
    }
  }
})

theme.components = {
  MuiCssBaseline: {
    styleOverrides: {
      ":focus-visible": {
        borderRadius: theme.shape.borderRadius,
        outline: `2px solid ${theme.palette.primary.main}`
      },
      "div#root": {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh"
      }
    }
  }
}

export default theme
