import { ReactNode } from "react"

import generateTemplateMetadata from "../../../utils/generateTemplateMetadata"

export function generateMetadata() {
  return generateTemplateMetadata({
    caption: `日別ランキング`,
    discription: `Twitch(ツイッチ)クリップの日別再生数ランキング。※すべての配信者の集計ではありません。`
  })
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return <section>{children}</section>
}
