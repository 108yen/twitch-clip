import { ReactNode } from "react";

export const metadata = {
    title: `過去ランキング`,
    description:`Twitch(ツイッチ)クリップの年別再生数ランキング。※すべての配信者の集計ではありません。`,
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (<section>{children}</section>);
}
