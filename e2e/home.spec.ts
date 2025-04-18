import { expect, test } from "@playwright/test"

test("has title", async ({ page }) => {
  await page.goto("/")

  await expect(page).toHaveTitle(/Twitchクリップランキング/)
})

test.describe("navigation links works correctly", () => {
  test("site title", async ({ page }) => {
    await page.goto("/streamers")

    await page.getByRole("link", { name: /twitch clip ranking/i }).click()

    await expect(page).toHaveURL("/")
  })

  test.skip(({ isMobile }) => isMobile, "This feature is laptop only")

  test("top", async ({ page }) => {
    await page.goto("/streamers")

    await page.getByRole("link", { name: /link to top page/i }).click()

    await expect(page).toHaveURL("/")
  })

  test("daily ranking", async ({ page }) => {
    await page.goto("/")

    await page
      .getByRole("link", { name: /link to daily ranking page/i })
      .click()

    await expect(page).toHaveURL("/daily")
  })

  test("past ranking", async ({ page }) => {
    await page.goto("/")

    await page.getByRole("link", { name: /link to past ranking page/i }).click()

    await expect(page).toHaveURL("/past")
  })

  test("favorite", async ({ page }) => {
    await page.goto("/")

    await page.getByRole("link", { name: /link to favorite page/i }).click()

    await expect(page).toHaveURL("/favorite")
  })

  test("channels", async ({ page }) => {
    await page.goto("/")

    await page.getByRole("link", { name: /link to channels page/i }).click()

    await expect(page).toHaveURL("/streamers")
  })
})

test.describe("menu works correctly", () => {
  test("open and close", async ({ page }) => {
    await page.goto("/")

    await page.getByRole("button", { name: /menu button/i }).click()

    await expect(page.getByRole("menu")).toBeVisible()
  })
})
