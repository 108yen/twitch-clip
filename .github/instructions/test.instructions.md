---
applyTo: "e2e/**"
---

# Playwright E2Eテスト作成ルール

- テストファイルは`e2e/`ディレクトリ配下に配置してください。
- ファイル名は`*.spec.ts`としてください。
- テストフレームワークは`@playwright/test`を使用してください。
- テストケースは`test`または`test.describe`でグループ化し、分かりやすいタイトルを付けてください。
- 画面遷移やUI操作は`page.goto`や`page.getByRole`などのPlaywright APIを利用してください。
- 期待値の検証には`expect`を使い、タイトルやURL、要素の表示状態などを確認してください。
- 日本語でテスト内容を記述しても構いません。
- 不安定なテストや未実装機能のテストは`test.skip`や`test.only`を活用してください。

## サンプル

```typescript
import { expect, test } from "@playwright/test"

test("トップページのタイトルが正しい", async ({ page }) => {
  await page.goto("/")
  await expect(page).toHaveTitle(/Twitchクリップランキング/)
})

test.describe("ナビゲーションリンク", () => {
  test("トップページへのリンクが機能する", async ({ page }) => {
    await page.goto("/streamers")
    await page.getByRole("link", { name: /twitch clip ranking/i }).click()
    await expect(page).toHaveURL("/")
  })
})
```
