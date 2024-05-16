import { useState } from "react"
import { Box, Button, Card, CardContent, CardMedia, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"

type VideoFormProps = {
  isEditRoute?: boolean
}

type Video = {
  title: string
  link: string
  category: string
  description: string
}

type VideoCard = {
  thumbnail: string | null
} & Omit<Video, "link">

export const VideoForm = ({ isEditRoute }: VideoFormProps) => {
  const { register, handleSubmit, reset, watch, formState: { defaultValues, errors } } = useForm<Video>({
    ...isEditRoute && {
      defaultValues: {
        title: "Test",
        link: "youtu.be/DFYRQ_zQ-gk",
        category: "Test",
        description: "Test"
      }
    },
    mode: "onBlur"
  })

  const initialCategoryState = !isEditRoute ? "" : defaultValues?.category
  const [category, setCategory] = useState(initialCategoryState)

  const selectCategory = ({ target: { value } }: SelectChangeEvent) => setCategory(value)

  const resetForm = () => {
    reset()
    setCategory(initialCategoryState)
  }

  const submitVideo = (data: Video) => {
    if (!isEditRoute) {
      console.log("new video:", data)
      return
    }

    console.log("edited video:", data)
  }

  const getYouTubeVideoThumbnail = () => {
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|v\/|embed\/|user\/.*\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      /(?:https?:\/\/)?(?:m\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
      /(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]{11})/
    ]

    const linkValue = watch("link")

    if (linkValue) {
      for (const pattern of patterns) {
        const match = linkValue.match(pattern)
  
        if (match && match[1]) {
          return `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`
        }
      }
    }

    return null
  }

  const card: VideoCard = {
    thumbnail: getYouTubeVideoThumbnail(),
    title: watch("title"),
    category: watch("category"),
    description: watch("description")
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(submitVideo)}
      autoComplete="off"
      aria-autocomplete="none"
      aria-labelledby="form_title"
      maxWidth="sm"
      mx="auto"
      sx={{ "> :not(h3)": { mt: 2 } }}
    >
      <Typography id="form_title" component="h1" variant="h4" align="center">
        {`${!isEditRoute ? "New" : "Edit"} Video`}
      </Typography>
      <TextField
        id="title"
        {...register("title", {
          minLength: { value: 3, message: "Title is too short. It must have at least 3 characters." },
          maxLength: { value: 100, message: "Title is too long. It must have max of 100 characters." }
        })}
        {...errors.title && { error: true, helperText: errors.title.message as string }}
        label="Title"
        type="text"
        aria-describedby="title-helper-text"
        variant="filled"
        fullWidth
      />
      <TextField
        id="link"
        {...register("link", {
          required: "Link is required.",
          pattern: {
            value: /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/g,
            message: "Link is invalid. Please, enter a valid YouTube URL."
          }
        })}
        {...errors.link && { error: true, helperText: errors.link.message as string }}
        label="Link"
        type="text"
        aria-describedby="link-helper-text"
        variant="filled"
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          {...register("category", {
            required: "Category is required.",
            onChange: selectCategory
          })}
          value={category}
          error={!!errors.category}
          label="Category"
          aria-describedby="category-helper-text"
          variant="filled"
          fullWidth
        >
          <MenuItem value="Test">Test</MenuItem>
        </Select>
        {errors.category && (
          <FormHelperText id="category-helper-text">{errors.category.message}</FormHelperText>
        )}
      </FormControl>
      <TextField
        id="description"
        {...register("description", {
          minLength: { value: 10, message: "Description is too short. It must have at least 10 characters." },
          maxLength: { value: 500, message: "Description is too long. It must have max of 500 characters." }
        })}
        {...errors.description && { error: true, helperText: errors.description.message as string }}
        label="Description"
        multiline
        rows={4}
        aria-describedby="description-helper-text"
        variant="filled"
        fullWidth
      />
      <Box>
        <Typography id="preview_title" component="h3" variant="h6" gutterBottom>
          Video Preview
        </Typography>
        <Card sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, p: 2 }}>
          <CardMedia
            image={card.thumbnail || "src/assets/img/default-image.svg"}
            title={`${card.title || "Video"} thumbnail`}
            sx={{ width: { sm: 320 }, height: 180 }}
          />
          <CardContent sx={{ width: { sm: 1/2 }, p: "0 !important" }}>
            <Typography variant="h5" gutterBottom={!card.category}>
              {card.title || "No title available."}
            </Typography>
            {card.category && (
              <Typography component="span" variant="button" display="block" my={1}>
                {card.category}
              </Typography>
            )}
            <Typography>
              {card.description || "No description available."}
            </Typography>
          </CardContent>
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
