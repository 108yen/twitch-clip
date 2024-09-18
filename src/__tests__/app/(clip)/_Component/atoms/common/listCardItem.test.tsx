import { fireEvent, render, screen } from "@testing-library/react"
import React, { ReactNode } from "react"

import "@testing-library/jest-dom"
import ListCardItem from "../../../../../../app/(clip)/_Component/atoms/common/listCardItem"

// ダミーデータを作成（テスト用）
const dummyClip = {
  title: "Test Clip",
  thumbnail_url: "test_thumbnail_url",
  url: "test_url",
  broadcaster_id: "test_broadcaster_id",
  broadcaster_name: "test_broadcaster_name",
  profile_image_url: "test_profile_image_url",
  creator_name: "test_creator_name",
  created_at: "2023-10-24T12:00:00Z",
  view_count: 1000,
}

// テスト用の関数をモック
const setClickedClipUrlMock = jest.fn()
const eventMock = jest.fn()

describe("ListCardItem", () => {
  beforeAll(() => {
    jest.mock("next/link", () => {
      return ({ children }: { children: ReactNode }) => {
        return children
      }
    })

    jest.mock("@/components/googleAnalytics/gtag", () => ({
      event: eventMock,
    }))
  })

  it("renders component correctly", () => {
    render(
      <ListCardItem
        clip={dummyClip}
        tab="testTab"
        setClickedClipUrl={setClickedClipUrlMock}
      />,
    )

    // コンポーネントが正しくレンダリングされたことを確認
    expect(screen.getByText("Test Clip")).toBeInTheDocument()
    // 他の必要な要素も同様に確認
  })

  it("clicking on title calls setClickedClipUrl and event", () => {
    render(
      <ListCardItem
        clip={dummyClip}
        tab="testTab"
        setClickedClipUrl={setClickedClipUrlMock}
      />,
    )

    const title = screen.getByText("Test Clip")
    fireEvent.click(title)

    // setClickedClipUrlとeventが正しく呼び出されたことを確認
    expect(setClickedClipUrlMock).toHaveBeenCalledWith(dummyClip)
    expect(eventMock).toHaveBeenCalledWith("click", {
      label: "click_clip_title",
      clip_title: "Test Clip",
      ranking_period: "testTab",
      link_url: "test_url",
    })
  })

  it("clicking on Twitch clip link calls event", () => {
    render(
      <ListCardItem
        clip={dummyClip}
        tab="testTab"
        setClickedClipUrl={setClickedClipUrlMock}
      />,
    )

    const twitchClipLink = screen.getByText("Test Clip")
    fireEvent.click(twitchClipLink)

    // eventが正しく呼び出されたことを確認
    expect(eventMock).toHaveBeenCalledWith("click", {
      label: "click_twitch_clip_link",
      clip_title: "Test Clip",
      ranking_period: "testTab",
      link_url: "test_url",
    })
  })
})
