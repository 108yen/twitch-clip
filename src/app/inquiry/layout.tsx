import { ReactNode } from "react";

export const metadata = {
    title: '問い合わせ',
    description: 'チャンネル追加リクエストページ',
    openGraph: {
        title: '問い合わせ',
        description: 'チャンネル追加リクエストページ',
    },
    twitter: {
        title: '問い合わせ',
        description: 'チャンネル追加リクエストページ',
    }
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (<section>{children}</section>);
}