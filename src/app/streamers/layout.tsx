import generateTemplateMetadata from "@/utils/generate-template-metadata"
import { ReactNode } from "react"

export function generateMetadata() {
  return generateTemplateMetadata({
    caption: "ストリーマー一覧",
    description: "ランキング集計しているストリーマーの一覧",
  })
}

export default function Layout({ children }: { children: ReactNode }) {
  return <section>{children}</section>
}
