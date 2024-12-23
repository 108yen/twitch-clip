import generateTemplateMetadata from "@/utils/generate-template-metadata"
import { ReactNode } from "react"

export function generateMetadata() {
  return generateTemplateMetadata({
    caption: "インストール手順",
    description: "Twitchクリップランキングのインストール手順",
  })
}

export default function Layout({ children }: { children: ReactNode }) {
  return <section>{children}</section>
}
