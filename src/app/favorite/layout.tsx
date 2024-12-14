import generateTemplateMetadata from "@/utils/generate-template-metadata"
import { ReactNode } from "react"

export function generateMetadata() {
  return generateTemplateMetadata({
    caption: "お気に入り",
    description: "お気に入りに保存したクリップの一覧",
  })
}

export default function Layout({ children }: { children: ReactNode }) {
  return <section>{children}</section>
}
