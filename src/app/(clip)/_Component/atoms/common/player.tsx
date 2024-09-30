import { Box } from "@mui/material"

export default function Player(props: { embed_url?: string }) {
  const { embed_url } = props

  return (
    <Box
      sx={{
        display: "flex",
        height: 0,
        justifyContent: "center",
        paddingBottom: "56.25%",
        position: "relative",
        width: "100%",
      }}
    >
      <iframe
        allowFullScreen
        loading="lazy"
        src={`${embed_url}&parent=localhost&parent=www.twitchclipsranking.com&parent=twitchclipsranking.com`}
        style={{
          border: "none",
          height: "100%",
          left: 0,
          position: "absolute",
          top: 0,
          width: "100%",
        }}
      />
    </Box>
  )
}
