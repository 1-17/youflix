import { signUp } from "../firebase"
import { Box, Button, TextField, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"

const SignUp = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<UserCredentials>({ mode: "onBlur" })
  
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(data => signUp(data, setError))}
      autoComplete="off"
      aria-autocomplete="none"
      maxWidth={400}
      mx="auto"
      sx={{ "& > :not(h3)": { mt: 2 } }}
    >
      <Typography component="h1" variant="h4" align="center">Sign Up</Typography>
      <TextField
        id="email"
        {...register("email", {
          required: "Email is required.",
          pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: "Email format is invalid." },
          maxLength: { value: 100, message: "Email is too long. It must have max of 100 characters." }
        })}
        {...errors.email && { error: true, helperText: errors.email.message as string }}
        label="Email"
        type="email"
        aria-required="true"
        aria-describedby="email-helper-text"
        variant="filled"
        fullWidth
      />
      <TextField
        id="password"
        {...register("password", {
          required: "Password is required.",
          minLength: { value: 6, message: "Password is too short. It must have min of 6 characters." }
        })}
        {...errors.password && { error: true, helperText: errors.password.message as string }}
        label="Password"
        type="password"
        aria-required="true"
        aria-describedby="password-helper-text"
        variant="filled"
        fullWidth
      />
      <Typography>Already have an account? <Link to="/login">Login</Link></Typography>
      <Button type="submit" variant="contained" size="large" fullWidth>Let's go</Button>
    </Box>
  )
}

export default SignUp
