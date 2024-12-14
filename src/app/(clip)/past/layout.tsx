import generateTemplateMetadata from "@/utils/generate-template-metadata"
import { ReactNode } from "react"

export function generateMetadata() {
  return generateTemplateMetadata({
    caption: "過去ランキング",
    description:
      "Twitch(ツイッチ)クリップの年別再生数ランキング。※すべての配信者の集計ではありません。",
  })
}

export default function Layout({ children }: { children: ReactNode }) {
  return <section>{children}</section>
}
