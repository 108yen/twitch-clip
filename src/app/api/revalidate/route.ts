import { isArray } from "@yamada-ui/react"
import crypto from "crypto"
import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

function generateSignature(data: string) {
  return crypto
    .createHmac(`sha256`, process.env.TWITCH_CLIP_FUNCTION_SIGNATURE as string)
    .update(data)
    .digest(`hex`)
}

function revalidatePaths(data: any) {
  const paths: string[] = data.paths

  if (!isArray(paths)) return

  paths.forEach((path) => {
    if (path == "/") {
      revalidatePath("/", "page")
      revalidatePath("/streamer/[id]", "page")
    } else {
      revalidatePath(path, "page")
    }

    console.log(`revalidate path: ${path}`)
  })
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-twitch-clip-function-signature")

  if (!signature)
    return NextResponse.json({ error: "Signature not found" }, { status: 401 })

  const body = await req.json()
  const expectedSignature = generateSignature(JSON.stringify(body))

  if (signature !== expectedSignature)
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 })

  try {
    revalidatePaths(body)

    return NextResponse.json("Revalidated")
  } catch (error) {
    console.error("revalidate request error: ", error)

    return NextResponse.json({ error: "Error revalidating" }, { status: 500 })
  }
}
