import { ReactNode } from "react"
import generateTemplateMetadata from "@/utils/generate-template-metadata"

export function generateMetadata() {
  return generateTemplateMetadata({
    caption: "このサイトについて",
    description: "Twitchクリップランキングの説明ページ",
  })
}

export default function Layout({ children }: { children: ReactNode }) {
  return <section>{children}</section>
}
