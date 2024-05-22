import { Box, Button, Stack, Typography } from "@mui/material"
import { usePaths } from "../hooks"

type FormProps = {
  handleSubmit: React.FormEventHandler<HTMLFormElement>
  children: React.ReactNode
  reset?: () => void
}

const Form = ({ handleSubmit, children, reset }: FormProps) => {
  if (!handleSubmit) {
    throw new Error("Form: Missing handleSubmit argument.")
  }

  const { currentName } = usePaths()

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      autoComplete="off"
      aria-autocomplete="none"
      aria-labelledby="form_title"
      sx={{ "> :not(h1)": { mt: 2 } }}
    >
      <Typography id="form_title" component="h1" variant="h4" align="center">
        {currentName}
      </Typography>
      {children}
      {!reset ? (
        <Button type="submit" fullWidth>
          Save
        </Button>
      ) : (
        <Stack direction="row" spacing={2} maxWidth={400} ml="auto">
          <Button type="button" onClick={reset} color="inherit" fullWidth>
            Reset
          </Button>
          <Button type="submit" fullWidth>
            Save
          </Button>
        </Stack>
      )}
    </Box>
  )
}

export default Form
