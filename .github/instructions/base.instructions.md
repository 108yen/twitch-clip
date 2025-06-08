---
applyTo: "**"
---

# 概要

このリポジトリは、TwitchのClipをランキング形式で表示するWebアプリケーションです。

## フォルダ構成

```
CHANGELOG.md                # 変更履歴
cspell.json                 # スペルチェック設定
eslint.config.mjs           # ESLint設定
firestore-debug.log         # Firestoreデバッグログ
ignore-build-step.sh        # ビルドステップ無効化用スクリプト
lefthook.yaml               # Gitフック設定
next-env.d.ts               # Next.js型定義
next-sitemap.config.js      # サイトマップ生成設定
next.config.ts              # Next.js設定
package.json                # パッケージ管理ファイル
playwright.config.ts        # Playwrightテスト設定
pnpm-lock.yaml              # pnpmロックファイル
README.md                   # プロジェクト説明
renovate.json               # Renovate設定
tsconfig.json               # TypeScript設定
tsconfig.tsbuildinfo        # TypeScriptビルド情報
vercel.json                 # Vercelデプロイ設定

data/                       # データエクスポート関連
  └─ (日付ごとのエクスポートデータ)
e2e/                        # E2Eテスト
  └─ home.spec.ts
public/                     # 公開用静的ファイル
  └─ (アイコン・画像・静的アセット)
src/                        # アプリケーション本体
  ├─ instrumentation.ts     # 計測用エントリポイント
  ├─ app/                   # Next.js App Router配下
  │   ├─ global-error.tsx   # グローバルエラーハンドラ
  │   ├─ layout.tsx         # ルートレイアウト
  │   ├─ manifest.ts        # Web App Manifest
  │   ├─ (clip)/            # クリップ関連ページ
  │   ├─ about/             # アバウトページ
  │   ├─ api/               # APIルート
  │   ├─ install-manual/    # インストール手順ページ
  │   ├─ release-note/      # リリースノート
  │   └─ streamers/         # 配信者関連ページ
  ├─ constant/              # 定数定義
  ├─ content/               # 静的コンテンツ（mdx）
  ├─ contexts/              # React Context
  ├─ firebase/              # Firebase関連
  │   └─ server/            # サーバーサイド用
  ├─ hooks/                 # React Hooks
  ├─ models/                # 型・モデル定義
  ├─ scheme/                # スキーマ定義
  ├─ scripts/               # スクリプト・バッチ
  ├─ sentry/                # Sentry設定
  ├─ storage/               # ストレージ関連
  ├─ theme/                 # テーマ設定
  │   ├─ config.ts          # テーマ設定
  │   ├─ index.ts           # テーマエントリ
  │   ├─ semantics.ts       # セマンティックカラー
  │   ├─ components/        # テーマ用コンポーネント
  │   ├─ styles/            # テーマ用スタイル
  │   └─ tokens/            # デザイントークン
  ├─ types/                 # 型定義
  ├─ ui/                    # UIコンポーネント
  │   ├─ components/        # 汎用UIコンポーネント
  │   ├─ layouts/           # レイアウトコンポーネント
  │   └─ templates/         # テンプレート・画面単位UI
  └─ utils/                 # ユーティリティ関数
```

# 機能

## DB

DBとしてfirestoreを使用しています。

## UIコンポーネント

UIライブラリとして、[Yamada UI](https://yamada-ui.com/)を使用しています。
UIコンポーネントを作成する際は、Yamada UIのコンポーネントを使用してください。

## フレームワーク

フレームワークとして、[Next.js](https://nextjs.org/)のApp Routerを使用しています。
