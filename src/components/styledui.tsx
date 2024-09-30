"use client"
import { Launch } from "@mui/icons-material"
import { AppBar, Button, Paper, Select, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

export const BorderPaper = styled(Paper)(({ theme }) => ({
  border: "1px solid",
  borderColor: theme.palette.secondary.main,
  boxShadow: "none",
  overflow: "hidden",
}))

export const NoDecorationTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}))

export const SelectTypography = styled(Typography)(({ theme }) => ({
  "&:hover": {
    color: theme.palette.text.primary,
  },
  color: theme.palette.text.disabled,
  transitionDuration: "0.3s",
}))

export const StyledLaunch = styled(Launch)(({ theme }) => ({
  color: theme.palette.text.primary,
}))

export const AboutBodyTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  variant: "body1",
  whiteSpace: "pre-line",
}))

type PaperAppBarProps = {
  istransparent: string
}
export const PaperAppBar = styled(AppBar)<PaperAppBarProps>(({
  istransparent: istransparent,
  theme,
}) => {
  const backgroundColorDefault =
    theme.palette.mode === "light"
      ? theme.palette.primary.light
      : theme.palette.grey[900]
  const background =
    istransparent == "true" ? "transparent" : backgroundColorDefault

  return {
    background: background,
    boxShadow: "none",
    transition: "background-color 0.3s",
  }
})

export const Div = styled("div")(() => ({}))

export const SimpleButton = styled(Button)(({ theme }) => {
  if (theme.palette.mode === "light") {
    return {
      "&:hover": {
        backgroundColor: theme.palette.grey[50],
        borderColor: theme.palette.text.primary,
      },
      borderColor: theme.palette.grey[400],
      color: theme.palette.text.primary,
    }
  }
})

export const BorderSelect = styled(Select)(({ theme }) => {
  return {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.text.primary,
    },
  }
})
