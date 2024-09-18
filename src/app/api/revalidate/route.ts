import crypto from "crypto"
import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-twitch-clip-function-signature")

  if (!signature)
    return NextResponse.json({ error: "Signature not found" }, { status: 401 })

  const body = await req.json()
  const expectedSignature = crypto
    .createHmac("sha256", process.env.TWITCH_CLIP_FUNCTION_SIGNATURE as string)
    .update(JSON.stringify(body))
    .digest("hex")

  if (signature !== expectedSignature)
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 })

  try {
    revalidatePath("/")
    
    return NextResponse.json("Revalidated")
  } catch (error) {
    console.error("revalidate request error: ", error)

    return NextResponse.json({ error: "Error revalidating" }, { status: 500 })
  }
}
