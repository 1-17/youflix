import { Box, Button, Stack, Typography } from "@mui/material"
import { usePaths } from "../hooks"
import { FormProps } from "../types"

const Form = ({ onSubmit, children, reset, submitButtonText }: FormProps) => {
  const { currentName } = usePaths()

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
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
          {submitButtonText || "Save"}
        </Button>
      ) : (
        <Stack direction="row" spacing={2} maxWidth={400} ml="auto">
          <Button type="button" onClick={reset} color="inherit" fullWidth>
            Reset
          </Button>
          <Button type="submit" fullWidth>
            {submitButtonText || "Save"}
          </Button>
        </Stack>
      )}
    </Box>
  )
}

export default Form
