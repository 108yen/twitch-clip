import { Stack, Typography } from "@mui/material"

export default function ClipInfo(props: {
  title?: string
  view_count?: number
}) {
  const { title, view_count } = props

  return (
    <Stack
      alignItems="flex-start"
      direction="row"
      flexGrow={1}
      justifyContent="space-between"
      overflow="hidden"
    >
      <Typography fontWeight="bold" noWrap variant="h6">
        {title}
      </Typography>
      <Typography align="right" color="grey" minWidth={95} variant="body2">
        {`${view_count?.toLocaleString()} views`}
      </Typography>
    </Stack>
  )
}
