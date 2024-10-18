import generateTemplateMetadata from "@/utils/generate-template-metadata"
import { ReactNode } from "react"

export function generateMetadata() {
  return generateTemplateMetadata({
    caption: "ストリーマー一覧",
    description: "ランキング集計しているストリーマーの一覧ページです。",
  })
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return <section>{children}</section>
}
