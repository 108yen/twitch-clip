import { ReactNode } from "react"

import generateTemplateMetadata from "../../../utils/generateTemplateMetadata"

export function generateMetadata() {
  return generateTemplateMetadata({
    caption: "過去ランキング",
    discription:
      "Twitch(ツイッチ)クリップの年別再生数ランキング。※すべての配信者の集計ではありません。"
  })
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return <section>{children}</section>
}
