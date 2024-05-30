import { atomWithStorage } from "jotai/utils"

export const isDarkModeAtom = atomWithStorage<boolean | undefined>(
  "twitch-clip-ranking-isDarkMode",
  undefined
)
