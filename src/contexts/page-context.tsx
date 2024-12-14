"use client"
import { Clip } from "@/models/clip"
import {
  deleteClip as idbDeleteClip,
  getClips as idbGetClips,
  saveClip as idbSaveClip,
  openDatabase,
} from "@/storage"
import {
  createContext,
  PropsWithChildren,
  use,
  useCallback,
  useContext,
  useMemo,
} from "react"

export interface PageProviderProps extends PropsWithChildren {
  version: string
}

interface PageProviderContextProps extends PageProviderProps {
  deleteClip: (id: string) => Promise<string>
  getClips: () => Promise<Clip[]>
  saveClip: (clip: Clip) => Promise<string>
}

const defaultValue: PageProviderContextProps = {
  deleteClip: async () => "",
  getClips: async () => [],
  saveClip: async () => "",
  version: "",
}

export const PageContext = createContext<PageProviderContextProps>(defaultValue)

export function PageProvider({ children, ...rest }: PageProviderProps) {
  const db = use(openDatabase())

  const saveClip = useCallback((clip: Clip) => idbSaveClip(clip, db), [db])
  const deleteClip = useCallback((id: string) => idbDeleteClip(id, db), [db])
  const getClips = useCallback(() => idbGetClips(db), [db])

  const value = useMemo(
    () => ({ deleteClip, getClips, saveClip, ...rest }),
    [deleteClip, getClips, rest, saveClip],
  )

  return <PageContext value={value}>{children}</PageContext>
}

export function usePage() {
  return useContext(PageContext)
}
