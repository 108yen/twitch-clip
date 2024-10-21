/* eslint-disable import/no-unresolved */
"use client"

import { Box } from "@yamada-ui/react"
import { PlayerOptions, Twitch } from "https://player.twitch.tv/js/embed/v1.js"
import { useId } from "react"

export function Player() {
  const id = useId()

  const options: PlayerOptions = {
    height: "100%",
    parent: ["localhost"],
    video: "",
    width: "100%",
  }

  const player = new Twitch.Player(id, options)
  player.play()

  return <Box id={id} />
}
