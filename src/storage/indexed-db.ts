import { CONSTANT } from "@/constant"
import { Clip } from "@/models/clip"

function onupgradeneeded(event: IDBVersionChangeEvent) {
  const db = (event.target as IDBOpenDBRequest).result

  if (!db.objectStoreNames.contains(CONSTANT.INDEXED_DB.store)) {
    const objectStore = db.createObjectStore(CONSTANT.INDEXED_DB.store, {
      keyPath: CONSTANT.INDEXED_DB.keyPath,
    })

    objectStore.createIndex("title", "title", { unique: false })
    objectStore.createIndex("broadcaster_name", "broadcaster_name", {
      unique: false,
    })
    objectStore.createIndex("broadcaster_login", "broadcaster_login", {
      unique: false,
    })
  }
}

/**
 *
 * @see Docs https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
 */
export async function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window == "undefined") reject("Window is undefined.")

    const request: IDBOpenDBRequest = indexedDB.open(
      CONSTANT.INDEXED_DB.dbName,
      CONSTANT.INDEXED_DB.version,
    )

    request.onupgradeneeded = onupgradeneeded

    request.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result
      resolve(db)
    }

    request.onerror = (event: Event) => {
      reject((event.target as IDBOpenDBRequest).error)
    }
  })
}

/**
 *
 * @see Docs https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB#adding_data_to_the_database
 */
export async function saveClip(clip: Clip, db: IDBDatabase): Promise<string> {
  return new Promise((resolve, rejects) => {
    if (!clip.id) {
      rejects("Clip id is undefined.")
    }

    const request = db
      .transaction([CONSTANT.INDEXED_DB.store], "readwrite")
      .objectStore(CONSTANT.INDEXED_DB.store)
      .put(clip)

    request.onsuccess = (event: Event) => {
      const id = (event.target as IDBOpenDBRequest).result
      resolve(id as unknown as string)
    }

    request.onerror = (event: Event) => {
      rejects((event.target as IDBOpenDBRequest).error)
    }
  })
}

/**
 *
 * @see Docs https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB#removing_data_from_the_database
 */
export async function deleteClip(id: string, db: IDBDatabase): Promise<string> {
  return new Promise((resolve, rejects) => {
    const request = db
      .transaction([CONSTANT.INDEXED_DB.store], "readwrite")
      .objectStore(CONSTANT.INDEXED_DB.store)
      .delete(id)

    request.onsuccess = (event: Event) => {
      const id = (event.target as IDBOpenDBRequest).result
      resolve(id as unknown as string)
    }

    request.onerror = (event: Event) => {
      rejects((event.target as IDBOpenDBRequest).error)
    }
  })
}

/**
 *
 * @see Docs https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB#using_a_cursor
 */
export async function getClips(db: IDBDatabase): Promise<Clip[]> {
  return new Promise((resolve, rejects) => {
    const request: IDBRequest<Clip[]> = db
      .transaction([CONSTANT.INDEXED_DB.store], "readonly")
      .objectStore(CONSTANT.INDEXED_DB.store)
      .getAll()

    request.onsuccess = (event: Event) => {
      const result = (event.target as IDBOpenDBRequest).result
      resolve(result as unknown as Clip[])
    }

    request.onerror = (event: Event) => {
      rejects((event.target as IDBOpenDBRequest).error)
    }
  })
}
