import { ClipDoc } from '../../../../../models/clipDoc'

export default function getTabNameList(clipDoc: ClipDoc) {
    const defaultArray: Array<string> = [
        `day`, //
        `week`,
        `month`,
        `year`,
        `all`
    ]
    const currentYear = new Date().getFullYear()
    const tabArray: Array<string> = []
    for (const key in defaultArray) {
        const element = defaultArray[key]
        if (clipDoc[element] != undefined) {
            tabArray.push(element)
        }
    }
    for (let year = currentYear - 1; year >= 2016; year--) {
        if (clipDoc[year.toString()] != undefined) {
            tabArray.push(year.toString())
        }
    }
    const today = new Date()
    for (let index = 0; index < 7; index++) {
        const targetDay = new Date(
            today.getTime() - index * 24 * 60 * 60 * 1000
        )
        const key = `${targetDay.getMonth() + 1}/${targetDay.getDate()}`
        if (clipDoc[key] != undefined) {
            tabArray.push(key)
        }
    }

    return tabArray
}
