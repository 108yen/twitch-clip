import { atomWithStorage } from 'jotai/utils'

export const isDarkModeAtom = atomWithStorage<boolean | undefined>(
    `isDarkMode`,
    undefined
)
