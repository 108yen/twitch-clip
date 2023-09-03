import { ReactNode } from "react";

export const metadata = {
    title: '過去ランキング',
    openGraph: {
        title: '過去ランキング',
    },
    twitter: {
        title: '過去ランキング',
    }
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (<section>{children}</section>);
}