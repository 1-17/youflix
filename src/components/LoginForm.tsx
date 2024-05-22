import { TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { UserCredential, login } from "../firebase"
import { usePaths } from "../hooks"
import Form from "./Form"

export const LoginForm = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<UserCredential>({ mode: "onBlur" })
  const { loginConfirmation } = usePaths()

  if (loginConfirmation.isCurrentPath) {
    login.confirm()
  }

  const submitLogin = (data: UserCredential) => {
    if (loginConfirmation.isCurrentPath) {
      login.confirm(data.email, setError)
      return
    }

    login.request(data.email, setError)
  }
  
  return (
    <Form onSubmit={handleSubmit(submitLogin)} submitButtonText="Let's go">
      {loginConfirmation.isCurrentPath && (
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
      />
    </Form>
  )
}
