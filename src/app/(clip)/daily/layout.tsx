import { ReactNode } from "react"
import generateTemplateMetadata from "@/utils/generate-template-metadata"

export function generateMetadata() {
  return generateTemplateMetadata({
    caption: "日別ランキング",
    description:
      "Twitch(ツイッチ)クリップの日別再生数ランキング。※すべての配信者の集計ではありません。",
  })
}

export default function Layout({ children }: { children: ReactNode }) {
  return <section>{children}</section>
}
