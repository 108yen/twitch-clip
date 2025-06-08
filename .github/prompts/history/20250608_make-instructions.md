---
mode: "agent"
tools: ["codebase", "githubRepo"]
description: "`base.instructions.md`の内容を作成するためのプロンプトです。"
---

# 依頼内容

本プロジェクトのフォルダ構成を読み取り、その構成と簡単な説明を追加してください。フォルダ構成はツリーの形で記載してください
以下のような形式で、プロジェクトルートにあるファイル、フォルダについても記載してください。

```
app
├── root.tsx                # アプリケーションのエントリポイント
├── routes.ts               # ルーティング設定
├── routes/                 # 画面ごとのルーティング関連ファイル
├── theme/                  # テーマ設定関連
├── ui/
│   ├── components/         # UIコンポーネント
│   ├── layouts/            # レイアウトコンポーネント
│   └── templates/          # テンプレート・画面単位のUI
```
