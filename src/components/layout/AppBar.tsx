import { Box, AppBar as Bar, Toolbar, Button, Hidden, Link, Typography, Container } from "@mui/material"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Logo from "../Logo"

type NavigationButton = {
  href: string
  text: string
  isValid: boolean
  navigate: React.MouseEventHandler<HTMLButtonElement>
}

const AppBar = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const navigationButton = {} as NavigationButton

  switch (true) {
    case pathname === "/":
    navigationButton.href = "login"
    navigationButton.text = "Login"
    break
    
    case pathname === "/new_video":
    navigationButton.href = "new_category"
    navigationButton.text = "New category"
    break
    
    case pathname === "/new_category":
    navigationButton.href = "new_video"
    navigationButton.text = "New video"
    break
  }

  if (navigationButton.href) {
    navigationButton.isValid = true
    navigationButton.navigate = () => navigate(navigationButton.href)
  }

  return (
    <>
      <Bar position="sticky">
        <Toolbar component="nav" aria-label="Main navigation" sx={{ py: 2 }}>
          <Box aria-label="Logo" width={{ xs: 120, sm: 180 }} mx={{ xs: "auto", sm: "initial" }} sx={{
            a: { display: "inline-block" }, svg: { display: "inline", verticalAlign: "middle" }
          }}>
            <Logo />
          </Box>
          {navigationButton.isValid && (
            <>
              {/* Mobile Navigation Button */}
              <Hidden smUp>
                <Button onClick={navigationButton.navigate} variant="contained" size="large" fullWidth sx={{
                  borderRadius: 0, position: "fixed", left: 0, bottom: 0, py: 1.5
                }}>
                  {navigationButton.text}
                </Button>
              </Hidden>
              {/* Desktop Navigation Button */}
              <Hidden smDown>
                <Button onClick={navigationButton.navigate} variant="outlined" color="inherit" size="large" sx={{
                  lineHeight: 2, minWidth: 180, ml: "auto"
                }}>
                  {navigationButton.text}
                </Button>
              </Hidden>
            </>
          )}
        </Toolbar>
      </Bar>
      <Container component="main" maxWidth={false} sx={{ flexGrow: 1, pt: 4, pb: 8 }}>
        <Outlet />
      </Container>
      <Hidden {...navigationButton.isValid && { smDown: true }}>
        <Bar component="footer" position="static">
          <Toolbar aria-label="Credits">
            <Typography aria-label="Copyright" component="span" mr={2}>© 2024 YouFlix</Typography>
            <Typography aria-label="Author" component="span" ml="auto">
              Made by {""}
              <Link href="https://github.com/1-17" target="_blank" rel="noopener noreferrer" underline="hover" fontWeight={700}>
                117
              </Link>
            </Typography>
          </Toolbar>
        </Bar>
      </Hidden>
    </>
  )
}

export default AppBar
