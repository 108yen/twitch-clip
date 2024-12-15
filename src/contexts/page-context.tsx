"use client"
import { Clip } from "@/models/clip"
import {
  deleteClip as idbDeleteClip,
  getAllClips as idbGetAllClips,
  getClip as idbGetClip,
  saveClip as idbSaveClip,
  openDatabase,
} from "@/storage"
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

export interface PageProviderProps extends PropsWithChildren {
  version: string
}

interface PageProviderContextProps extends PageProviderProps {
  deleteClip: (id: string) => Promise<string>
  getAllClips: () => Promise<Clip[] | undefined>
  getClip: (id: string) => Promise<Clip | undefined>
  saveClip: (clip: Clip) => Promise<string>
}

const defaultValue: PageProviderContextProps = {
  deleteClip: async () => "",
  getAllClips: async () => [],
  getClip: async () => undefined,
  saveClip: async () => "",
  version: "",
}

export const PageContext = createContext<PageProviderContextProps>(defaultValue)

export function PageProvider({ children, ...rest }: PageProviderProps) {
  const [db, setDB] = useState<IDBDatabase>()

  useEffect(() => {
    if (typeof window == "undefined") return

    async function openDB() {
      const db = await openDatabase()
      setDB(db)
    }

    openDB()
  }, [])

  const saveClip = useCallback((clip: Clip) => idbSaveClip(clip, db), [db])
  const deleteClip = useCallback((id: string) => idbDeleteClip(id, db), [db])
  const getAllClips = useCallback(() => idbGetAllClips(db), [db])
  const getClip = useCallback((id: string) => idbGetClip(id, db), [db])

  const value = useMemo(
    () => ({ deleteClip, getAllClips, getClip, saveClip, ...rest }),
    [deleteClip, getAllClips, getClip, rest, saveClip],
  )

  return <PageContext value={value}>{children}</PageContext>
}

export function usePage() {
  return useContext(PageContext)
}
