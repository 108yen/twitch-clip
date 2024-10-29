import { streamersConverter } from "@/firebase/server/converters/streamersConverter"
import { Streamer } from "@/models/streamer"
import * as admin from "firebase-admin"
import { DocumentReference } from "firebase-admin/firestore"
import { writeFile } from "fs/promises"
import "dotenv/config"

function getDB() {
  const serviceAccount = {
    authProviderX509CertUrl: process.env.AUTH_PROVIDER_X509_CERT_URL!,
    authUri: process.env.AUTH_URI!,
    clientC509CertUrl: process.env.CLIENT_X509_CERT_URL!,
    clientEmail: process.env.CLIENT_EMAIL!,
    clientId: process.env.CLIENT_ID!,
    privateKey: process.env.PRIVATE_KEY!.replace(/\\n/g, "\n"),
    privateKeyId: process.env.PRIVATE_KEY_ID!,
    projectId: process.env.PROJECT_ID!,
    tokenUri: process.env.TOKEN_URI!,
    type: process.env.TYPE!,
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.projectId}.firebaseio.com`,
  })

  return admin.firestore()
}

async function getStreamers() {
  const db = getDB()

  const streamersDocRef: DocumentReference<{
    streamers: Array<Streamer>
  }> = db
    .collection("streamers")
    .doc("streamers")
    .withConverter<{ streamers: Array<Streamer> }>(streamersConverter)

  const ds = await streamersDocRef.get().catch((error) => {
    console.log(error)
  })

  const streamers = ds?.data()?.streamers

  if (typeof streamers === "undefined") {
    console.error("Streamers is undefined.")
  }

  console.log(
    `info: get streamers at ${new Date().toLocaleString("ja-JP", {
      timeZone: "Asia/Tokyo",
    })}`,
  )

  return streamers
}

async function main() {
  const streamers = await getStreamers()

  if (!streamers) return

  const content = "export const STREAMERS = " + JSON.stringify(streamers)

  await writeFile("src/constant/streamers.ts", content)
}

main()
