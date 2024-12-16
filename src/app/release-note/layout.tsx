import generateTemplateMetadata from "@/utils/generate-template-metadata"
import { ReactNode } from "react"

export function generateMetadata() {
  return generateTemplateMetadata({
    caption: "リリースノート",
    description: "Twitchクリップランキングのリリースノート",
  })
}

export default function Layout({ children }: { children: ReactNode }) {
  return <section>{children}</section>
}
