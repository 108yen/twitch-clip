import { atom } from 'jotai'

const isDarkMode = atom<boolean | undefined>(undefined)
export const isDarkModeAtom = atom(
    (get) => {
        if (get(isDarkMode)) return get(isDarkMode)
        if (typeof window === `undefined`) return undefined
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
