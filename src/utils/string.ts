export function formatDate(value: string) {
  const date = new Date(value)

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Tokyo",
    year: "numeric",
  }

  const formattedDate = new Intl.DateTimeFormat("ja-JP", options).format(date)
  return formattedDate
}
