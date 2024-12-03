import { CONSTANT } from "@/constant"
import { ClipDoc } from "@/models/clipDoc"
import { splitObject } from "@yamada-ui/react"

import { compareDate, compareNumber } from "./string"

const yearKeysReg = /^\d{4}$/
const dailyKeysReg = /^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])$/

export function getTabs(clipDoc: ClipDoc | undefined) {
  if (!clipDoc) return []

  const keys = Object.keys(clipDoc).filter((value) => value != "streamerInfo")

  const tabArray: string[] = []

  if (keys.every((key) => CONSTANT.PERIODS.trend.includes(key))) {
    tabArray.push(...CONSTANT.PERIODS.trend)
  } else if (keys.every((key) => yearKeysReg.test(key))) {
    tabArray.push(...keys.sort(compareNumber))
  } else if (keys.every((key) => dailyKeysReg.test(key))) {
    tabArray.push(...keys.sort(compareDate))
  }

  return tabArray
}

export function splitClipDoc(clipDoc: ClipDoc) {
  return splitObject(clipDoc, CONSTANT.PERIODS.trend) as ClipDoc[]
}
