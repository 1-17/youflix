import { Box, Button, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { UserCredential, login } from "../firebase"

type LoginFormProps = {
  isConfirmationRoute?: boolean
}

export const LoginForm = ({ isConfirmationRoute }: LoginFormProps) => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<UserCredential>({ mode: "onBlur" })

  if (isConfirmationRoute) {
    login.confirm()
  }
  
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(data => !isConfirmationRoute ? login.request(data.email, setError) : login.confirm(data.email, setError))}
      autoComplete="off"
      aria-autocomplete="none"
      aria-labelledby="form_title"
      maxWidth={400}
      mx="auto"
      sx={{ "> :not(h3)": { mt: 2 } }}
    >
      <Typography id="form_title" component="h1" variant="h4" align="center">
        {!isConfirmationRoute ? "Login" : "Login Confirmation"}
      </Typography>
      {isConfirmationRoute && (
        <Typography>Please, confirm the same email to login.</Typography>
      )}
      <TextField
        id="email"
        {...register("email", {
          required: "Email is required.",
          pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: "Email format is invalid." }
        })}
        {...errors.email && { error: true, helperText: errors.email.message as string }}
        label="Email"
        type="email"
        aria-describedby="email-helper-text"
        variant="filled"
        fullWidth
      />
      <Button type="submit" variant="contained" size="large" fullWidth>
        Let's go
      </Button>
    </Box>
  )
}
