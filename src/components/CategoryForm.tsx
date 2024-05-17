import { useState } from "react"
import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"

type CategoryFormProps = {
  isEditRoute?: boolean
}

type Category = {
  name: string
  description: string
  color: string
}

export const CategoryForm = ({ isEditRoute }: CategoryFormProps) => {
  const { register, handleSubmit, watch, reset, clearErrors, trigger, formState: { defaultValues, errors } } = useForm<Category>({
    ...isEditRoute && {
      defaultValues: {
        name: "Test",
        description: "Test",
        color: "#ce4e5e"
      }
    },
    mode: "onBlur"
  })

  const initialColor = "#000000"
  const initialColorState = !isEditRoute ? initialColor : defaultValues?.color
  const [color, setColor] = useState(initialColorState)

  const handleColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (e.type.includes("change")) {
      setColor(value)
    }

    if (errors.color && value !== initialColor) {
      clearErrors("color")
      return
    }

    trigger("color")
  }

  const resetForm = () => {
    reset()
    setColor(initialColorState)
  }

  const submitCategory = (data: Category) => {
    if (!isEditRoute) {
      console.log("new category:", data)
      return
    }

    console.log("edited category:", data)
  }

  const card: Category = {
    name: watch("name"),
    description: watch("description"),
    color: watch("color")
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(submitCategory)}
      autoComplete="off"
      aria-autocomplete="none"
      aria-labelledby="form_title"
      maxWidth="sm"
      mx="auto"
      sx={{ "> :not(h1)": { mt: 2 } }}
    >
      <Typography id="form_title" component="h1" variant="h4" align="center">
        {`${!isEditRoute ? "New" : "Edit"} Category`}
      </Typography>
      <TextField
        id="name"
        {...register("name", {
          required: "Name is required.",
          minLength: { value: 3, message: "Name is too short. It must have at least 3 characters." },
          maxLength: { value: 20, message: "Name is too long. It must have max of 20 characters." }
        })}
        {...errors.name && { error: true, helperText: errors.name.message as string }}
        label="Name"
        type="text"
        aria-describedby="name-helper-text"
        variant="filled"
        fullWidth
      />
      <TextField
        id="description"
        {...register("description", {
          minLength: { value: 10, message: "Description is too short. It must have at least 10 characters." },
          maxLength: { value: 100, message: "Description is too long. It must have max of 100 characters." }
        })}
        {...errors.description && { error: true, helperText: errors.description.message as string }}
        label="Description"
        multiline
        rows={4}
        aria-describedby="description-helper-text"
        variant="filled"
        fullWidth
      />
      <TextField
        id="color"
        {...register("color", {
          validate: (value) => value !== initialColor || "Color is required.",
          onChange: handleColor,
          onBlur: handleColor
        })}
        {...errors.color && { error: true, helperText: errors.color.message as string }}
        label="Color"
        type="color"
        value={color}
        aria-describedby="color-helper-text"
        variant="filled"
        fullWidth
      />
      <Box>
        <Typography id="preview_title" component="h3" variant="h6" gutterBottom>
          Category Preview
        </Typography>
        <Card sx={{
          ...card.color !== initialColor && { backgroundColor: card.color },
          display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, p: 2
        }}>
          <Typography component="span" variant="button">
            {card.name || "No name"}
          </Typography>
          <Typography>
            {card.description || "No description available."}
          </Typography>
        </Card>
      </Box>
      <Stack direction="row" spacing={2} maxWidth={400} ml="auto">
        <Button type="button" onClick={resetForm} variant="contained" color="inherit" size="large" fullWidth>
          {!isEditRoute ? "Clear" : "Reset"}
        </Button>
        <Button type="submit" variant="contained" size="large" fullWidth>
          Save
        </Button>
      </Stack>
    </Box>
  )
}
