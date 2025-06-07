import { ReactNode } from "react"
import generateTemplateMetadata from "@/utils/generate-template-metadata"

export function generateMetadata() {
  return generateTemplateMetadata({
    caption: "インストール手順",
    description: "Twitchクリップランキングのインストール手順",
  })
}

export default function Layout({ children }: { children: ReactNode }) {
  return <section>{children}</section>
}
