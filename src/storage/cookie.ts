export function doEveryThreeMonth(callback: () => void) {
  const key = "doSomethingEveryThreeMonth"

  if (!document) return

  if (!document.cookie.split("; ").find((row) => row.startsWith(key))) {
    document.cookie = `${key}=true; Max-Age=7776000; Secure`
    callback()
  }
}
