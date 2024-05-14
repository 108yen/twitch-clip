import { ReactNode } from "react"

import generateTemplateMetadata from "../../utils/generateTemplateMetadata"

export function generateMetadata() {
  return generateTemplateMetadata({
    caption: "このサイトについて",
    discription: "Twitchクリップランキングの説明ページ"
  })
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return <section>{children}</section>
}
