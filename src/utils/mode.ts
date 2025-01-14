export function getDisplayMode() {
  if (typeof window == "undefined") return "unknown"

  if (window.matchMedia("(display-mode: browser)").matches) return "browser"

  if (window.matchMedia("(display-mode: standalone)").matches)
    return "standalone"

  if (window.matchMedia("(display-mode: minimal-ui)").matches)
    return "minimal-ui"

  if (window.matchMedia("(display-mode: fullscreen)").matches)
    return "fullscreen"

  if (window.matchMedia("(display-mode: window-controls-overlay)").matches)
    return "window-controls-overlay"

  return "unknown"
}

interface GetThemeModeReturn {
  colorMode?: string
  themeScheme?: string
}

export function getThemeMode() {
  let result: GetThemeModeReturn = {
    colorMode: undefined,
    themeScheme: undefined,
  }

  if (typeof window == "undefined" || !("localStorage" in window)) return result

  result = {
    colorMode: localStorage.getItem("ui-color-mode") ?? undefined,
    themeScheme: localStorage.getItem("ui-theme-scheme") ?? undefined,
  }

  return result
}
