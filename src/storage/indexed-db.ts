import { CONSTANT } from "@/constant"
import { Clip } from "@/models/clip"

function onupgradeneeded(event: IDBVersionChangeEvent) {
  const db = (event.target as IDBOpenDBRequest).result

  if (!db.objectStoreNames.contains(CONSTANT.INDEXED_DB.favoriteStoreName)) {
    const objectStore = db.createObjectStore(
      CONSTANT.INDEXED_DB.favoriteStoreName,
      {
        keyPath: CONSTANT.INDEXED_DB.keyPath,
      },
    )

    objectStore.createIndex("title", "title", { unique: false })
    objectStore.createIndex("broadcaster_name", "broadcaster_name", {
      unique: false,
    })
    objectStore.createIndex("broadcaster_login", "broadcaster_login", {
      unique: false,
    })
    objectStore.createIndex("tag_id", "tag_id", {
      unique: false,
    })
  }

  if (!db.objectStoreNames.contains(CONSTANT.INDEXED_DB.tagStoreName)) {
    const objectStore = db.createObjectStore(CONSTANT.INDEXED_DB.tagStoreName, {
      autoIncrement: true,
    })

    objectStore.createIndex("name", "name", { unique: true })
  }
}

/**
 * Favorite store can store `Clip` type object and added `tag_id` column to tie the tag.
 * Tag store cant store tag.
 * @see Docs https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
 */
export async function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window == "undefined") return reject("Window is undefined.")

    const request: IDBOpenDBRequest = indexedDB.open(
      CONSTANT.INDEXED_DB.dbName,
      CONSTANT.INDEXED_DB.version,
    )

    request.onupgradeneeded = onupgradeneeded

    request.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result
      return resolve(db)
    }

    request.onerror = (event: Event) => {
      return reject((event.target as IDBOpenDBRequest).error)
    }
  })
}

/**
 *
 * @see Docs https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB#adding_data_to_the_database
 */
export async function saveClip(clip: Clip, db?: IDBDatabase): Promise<string> {
  return new Promise((resolve, rejects) => {
    if (!clip.id) {
      return rejects("Clip id is undefined.")
    }

    if (!db) {
      return rejects("DB is undefined.")
    }

    const request = db!
      .transaction([CONSTANT.INDEXED_DB.favoriteStoreName], "readwrite")
      .objectStore(CONSTANT.INDEXED_DB.favoriteStoreName)
      .put(clip)

    request.onsuccess = (event: Event) => {
      const id = (event.target as IDBOpenDBRequest).result
      return resolve(id as unknown as string)
    }

    request.onerror = (event: Event) => {
      return rejects((event.target as IDBOpenDBRequest).error)
    }
  })
}

/**
 *
 * @see Docs https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB#removing_data_from_the_database
 */
export async function deleteClip(
  id: string,
  db?: IDBDatabase,
): Promise<string> {
  return new Promise((resolve, rejects) => {
    if (!db) {
      return rejects("DB is undefined.")
    }

    const request = db!
      .transaction([CONSTANT.INDEXED_DB.favoriteStoreName], "readwrite")
      .objectStore(CONSTANT.INDEXED_DB.favoriteStoreName)
      .delete(id)

    request.onsuccess = (event: Event) => {
      const id = (event.target as IDBOpenDBRequest).result
      return resolve(id as unknown as string)
    }

    request.onerror = (event: Event) => {
      return rejects((event.target as IDBOpenDBRequest).error)
    }
  })
}

/**
 *
 * @see Docs https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB#using_a_cursor
 */
export async function getAllClips(
  db?: IDBDatabase,
): Promise<Clip[] | undefined> {
  return new Promise((resolve, rejects) => {
    if (!db) {
      return resolve(undefined)
    }

    const request: IDBRequest<Clip[]> = db!
      .transaction([CONSTANT.INDEXED_DB.favoriteStoreName], "readonly")
      .objectStore(CONSTANT.INDEXED_DB.favoriteStoreName)
      .getAll()

    request.onsuccess = (event: Event) => {
      const result = (event.target as IDBOpenDBRequest).result
      return resolve(result as unknown as Clip[])
    }

    request.onerror = (event: Event) => {
      return rejects((event.target as IDBOpenDBRequest).error)
    }
  })
}

/**
 *
 * @see Docs https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB#getting_data_from_the_database
 */
export async function getClip(
  id: string,
  db?: IDBDatabase,
): Promise<Clip | undefined> {
  return new Promise((resolve, rejects) => {
    if (!db) {
      return rejects("DB is undefined.")
    }

    const request: IDBRequest<Clip | undefined> = db!
      .transaction([CONSTANT.INDEXED_DB.favoriteStoreName], "readonly")
      .objectStore(CONSTANT.INDEXED_DB.favoriteStoreName)
      .get(id)

    request.onsuccess = (event: Event) => {
      const result = (event.target as IDBOpenDBRequest).result
      return resolve(result as unknown as Clip | undefined)
    }

    request.onerror = (event: Event) => {
      return rejects((event.target as IDBOpenDBRequest).error)
    }
  })
}
