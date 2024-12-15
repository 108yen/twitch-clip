import { toNumber } from "@yamada-ui/react"

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
