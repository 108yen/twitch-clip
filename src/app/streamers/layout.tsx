import { ReactNode } from "react";

export const metadata = {
    title: 'ストリーマー一覧',
    description: 'ランキング集計しているストリーマーの一覧ページです。',
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (<section>{children}</section>);
}