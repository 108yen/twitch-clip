import { Stack, Typography } from "@mui/material"

export default function ClipInfo(props: {
  title?: string
  view_count?: number
}) {
  const { title, view_count } = props

  return (
    <Stack
      direction="row"
      overflow="hidden"
      justifyContent="space-between"
      alignItems="flex-start"
      flexGrow={1}
    >
      <Typography variant="h6" fontWeight="bold" noWrap>
        {title}
      </Typography>
      <Typography align="right" minWidth={95} variant="body2" color="grey">
        {`${view_count?.toLocaleString()} views`}
      </Typography>
    </Stack>
  )
}
