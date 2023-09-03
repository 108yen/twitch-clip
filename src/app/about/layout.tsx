import { ReactNode } from "react";

export const metadata = {
    title: 'このサイトについて',
    description: 'Twitchクリップランキングの説明ページ',
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (<section>{children}</section>);
}