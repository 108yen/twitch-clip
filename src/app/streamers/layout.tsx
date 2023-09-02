import { ReactNode } from "react";

export const metadata = {
    title: 'ストリーマー一覧',
    description: {
        default: 'ランキング集計しているストリーマーの一覧ページです。',
    },
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (<>{children}</>);
}