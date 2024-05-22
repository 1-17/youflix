import { AppBar, Box, Button, Container, Hidden, Link, Toolbar, Typography } from "@mui/material"
import { Outlet } from "react-router-dom"
import { useNavigationButton } from "../hooks"
import Logo from "./Logo"

export const AppLayout = () => {
  const navigationButton = useNavigationButton()

  return (
    <>
      {/* Header */}
      <AppBar position="sticky">
        <Toolbar component="nav" aria-label="Main navigation" sx={{ py: 2 }}>
          <Box aria-label="Logo" width={{ xs: 120, sm: 180 }} mx={{ xs: "auto", sm: "initial" }} sx={{
            svg: { display: "inline", verticalAlign: "middle" }
          }}>
            <Logo />
          </Box>
          {navigationButton.isValid && (
            <>
              {/* Mobile Navigation Button */}
              <Hidden smUp>
                <Button onClick={navigationButton.navigate} fullWidth sx={{
                  borderRadius: 0, position: "fixed", left: 0, bottom: 0, py: 1.5
                }}>
                  {navigationButton.text}
                </Button>
              </Hidden>
              {/* Desktop Navigation Button */}
              <Hidden smDown>
                <Button onClick={navigationButton.navigate} variant="outlined" color="inherit" sx={{
                  lineHeight: 2, minWidth: 180, ml: "auto"
                }}>
                  {navigationButton.text}
                </Button>
              </Hidden>
            </>
          )}
        </Toolbar>
      </AppBar>
      {/* Main + Route Outlet */}
      <Container component="main" maxWidth={false} sx={{ flexGrow: 1, pt: 4, pb: 8 }}>
        <Outlet />
      </Container>
      {/* Footer */}
      <Hidden {...navigationButton.isValid && { smDown: true }}>
        <AppBar component="footer" position="static">
          <Toolbar aria-label="Credits">
            <Typography aria-label="Copyright" component="span" mr={2}>© 2024 YouFlix</Typography>
            <Typography aria-label="Author" component="span" ml="auto">
              Made by {""}
              <Link href="https://github.com/1-17" target="_blank" rel="noopener noreferrer" underline="hover" fontWeight={700}>
                117
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </Hidden>
    </>
  )
}
