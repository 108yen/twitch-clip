import { Box } from "@mui/material"

export default function Player(props: { embed_url?: string }) {
  const { embed_url } = props

  return (
    <Box
      sx={{
        position: `relative`,
        width: `100%`,
        height: 0,
        paddingBottom: `56.25%`,
        display: `flex`,
        justifyContent: `center`
      }}
    >
      <iframe
        src={`${embed_url}&parent=localhost&parent=www.twitchclipsranking.com&parent=twitchclipsranking.com`}
        allowFullScreen
        loading="lazy"
        style={{
          position: `absolute`,
          top: 0,
          left: 0,
          width: `100%`,
          height: `100%`,
          border: `none`
        }}
      />
    </Box>
  )
}
