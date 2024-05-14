import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

export const isDarkModeAtom = atomWithStorage<boolean | undefined>(
  "twitch-clip-ranking-isDarkMode",
  undefined
)

export const adClickAtom = atom<boolean>(false)
