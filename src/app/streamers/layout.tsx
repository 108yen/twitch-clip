import { ReactNode } from 'react'

import generateTemplateMetadata from '../../utils/generateTemplateMetadata'

export function generateMetadata() {
  return generateTemplateMetadata({
    caption: `ストリーマー一覧`,
    discription: `ランキング集計しているストリーマーの一覧ページです。`
  })
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return <section>{children}</section>
}
