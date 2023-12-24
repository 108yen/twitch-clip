import { atom } from 'jotai'

const isDarkMode = atom<boolean | undefined>(undefined)
export const isDarkModeAtom = atom(
    (get) => {
        const isDarkModeState = get(isDarkMode)
        if (isDarkModeState != undefined) return isDarkModeState
        // local check
        if (typeof window === `undefined`) return false
        const localStrageState = localStorage.getItem(`isDarkMode`)
        if (localStrageState != undefined) return localStrageState == `true`
        return undefined
    },
    (_get, set, update: boolean) => {
        const stateToString = update ? `true` : `false`
        localStorage.setItem(`isDarkMode`, stateToString)
        set(isDarkMode, update)
    }
)
