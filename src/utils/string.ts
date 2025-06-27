import { toNumber } from "@yamada-ui/react"
import { Clip } from "@/models/clip"

/**
 *
 * @param value
 * @returns Formatted date string to `2024/12/01 19:11:04`
 */
export function formatDate(value: string, dateOnly?: boolean) {
  const date = new Date(value)

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    timeZone: "Asia/Tokyo",
    year: "numeric",
    ...(dateOnly
      ? {}
      : {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
  }

  const formattedDate = new Intl.DateTimeFormat("ja-JP", options).format(date)
  return formattedDate
}

/**
 * Compare number for use sort.
 * @param a
 * @param b
 * @returns b-a
 */
export function compareNumber(a: string, b: string): number {
  return toNumber(b) - toNumber(a)
}

/**
 * Compare date for sort.
 * @param a String like `10/4`
 * @param b String like `9/1`
 * @returns If b after a, return 1. If reverse return -1.
 */
export function compareDate(a: string, b: string): number {
  const [monthA, dayA] = a.split("/").map(toNumber)
  const [monthB, dayB] = b.split("/").map(toNumber)

  if (monthA == 12 && monthB == 1) return 1
  if (monthA == 1 && monthB == 12) return -1

  if (monthA < monthB) return 1
  if (monthA > monthB) return -1

  if (dayA < dayB) return 1
  if (dayA > dayB) return -1

  return 0
}

/**
 * Convert seconds to ISO8601 duration format.
 * @param seconds
 * @returns Formatted string to ISO8601 duration format.
 */
export function toISO8601Duration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  let duration = "T"
  if (hours > 0) duration += `${hours}H`
  if (minutes > 0) duration += `${minutes}M`
  if (remainingSeconds > 0 || duration === "T")
    duration += `${remainingSeconds}S`

  return duration
}

/**
 * Create a URL to share a clip on Twitter.
 * @param shareUrl
 * @param clip
 * @returns url to share clip on Twitter.
 */
export function createTwitterUrl(clip: Clip, shareUrl?: string) {
  const text = `${clip.broadcaster_name} - ${clip.title}\n#Twitchクリップ #Twitchクリップランキング @twitchcliprank \n\n${shareUrl}`

  const url = new URL("https://twitter.com/intent/tweet")
  url.searchParams.set("text", text)

  return url.toString()
}
