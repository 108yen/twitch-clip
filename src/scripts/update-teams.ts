import "dotenv/config"
import type { Streamer, Team } from "@/models/streamer"
import * as p from "@clack/prompts"
import axios, { AxiosRequestConfig } from "axios"
import { Firestore } from "firebase-admin/firestore"
import { getDB } from "./db"
import {
  getStreamers,
  updateClip,
  updateStreamers,
} from "./firestore-repositories"

interface TwitchToken {
  access_token: string
  expires_in: number
  token_type: string
}

interface TeamApiReturn {
  background_image_url?: string
  banner?: string
  broadcaster_id?: string
  broadcaster_login?: string
  broadcaster_name?: string
  created_at?: string
  id?: string
  info?: string
  team_display_name?: string
  team_name?: string
  thumbnail_url?: string
  updated_at?: string
}

async function getToken(client_id: string, client_secret: string) {
  const config: AxiosRequestConfig = {
    headers: {
      ["Content-Type"]: "application/x-www-form-urlencoded",
    },
    method: "POST",
    params: {
      client_id: client_id,
      client_secret: client_secret,
      grant_type: "client_credentials",
    },
    paramsSerializer: { indexes: null },
    url: "https://id.twitch.tv/oauth2/token",
  }

  const res = await axios<TwitchToken>(config).catch((error) => {
    console.error(`TwitchAPI/getToken/axios: ${error}`)
    throw new Error(error)
  })
  const token = res?.data

  return token
}

async function getTeams(
  id: string,
  client_id: string,
  access_token: string,
): Promise<Team[]> {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${access_token}`,
      ["Client-Id"]: client_id,
    },
    method: "GET",
    params: {
      broadcaster_id: id,
    },
    url: "https://api.twitch.tv/helix/teams/channel",
  }
  const res = await axios<{ data: TeamApiReturn[] }>(config).catch((error) => {
    console.error(`TwitchStreamerApi/getTeam/axios: ${error}`)
    throw new Error(error)
  })

  const teams = res?.data.data.map(
    ({
      background_image_url,
      banner,
      created_at,
      id,
      info,
      team_display_name: display_name,
      team_name: name,
      thumbnail_url,
      updated_at,
    }) => ({
      background_image_url,
      banner,
      created_at,
      display_name,
      id,
      info,
      name,
      thumbnail_url,
      updated_at,
    }),
  )

  return teams
}

async function updateTeams(
  streamers: Streamer[],
  client_id: string,
  access_token: string,
  callback?: (message: string) => void,
): Promise<Streamer[]> {
  const result: Streamer[] = []

  for (const streamer of streamers) {
    const teams = await getTeams(streamer.id, client_id, access_token)

    result.push({
      ...streamer,
      teams,
    })

    callback?.(streamer.display_name ?? "")
  }

  return result
}

async function updateFirestore(
  db: Firestore,
  streamers: Streamer[],
  callback?: (message: string) => void,
) {
  await updateStreamers(db, streamers)
  callback?.("streamers")

  for (const streamer of streamers) {
    await updateClip(db, streamer.id, { streamerInfo: streamer })
    callback?.(streamer.display_name ?? "")
  }
}

/**
 * This script is to add teams data in streamers document of firestore emulator.
 * Need twitch api credentials(client_id, client_secret) because get teams data from twitch api and update streamers documentation.
 *
 */
async function main() {
  p.intro("Start updating teams data in firestore.")

  const s = p.spinner()

  const clientID = process.env.TWITCH_CLIENT_ID ?? ""
  const clientSecret = process.env.TWITCH_CLIENT_SECRET ?? ""

  try {
    s.start("Get twitch token.")
    const { access_token: accessToken } = await getToken(clientID, clientSecret)
    s.stop("Complete get Twitch token.")

    s.start("Get streamers from firestore.")
    const db = getDB()
    const streamers = await getStreamers(db)
    s.stop("Complete get streamers.")

    if (!streamers) {
      p.cancel("Streamers is undefined.")
      return
    }

    s.start("Get teams data and store to streamers.")
    const resolvedStreamers = await updateTeams(
      streamers,
      clientID,
      accessToken,
      s.message,
    )
    s.stop("Complete updating teams data.")

    s.start("Store to firestore.")
    await updateFirestore(db, resolvedStreamers)
    s.stop("Complete store to firestore.")

    p.outro("Finish.")
  } catch (error) {
    s.stop(`An error occurred`, 500)

    p.cancel(error instanceof Error ? error.message : "Message is missing")
  }
}

main()
