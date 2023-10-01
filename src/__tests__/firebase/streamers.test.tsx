import { deleteApp } from 'firebase/app'

import { db } from '@/firebase/client'
import getStreamers from '@/firebase/streamers'

describe(`getStreamersのテスト`, () => {
    afterAll(() => {
        deleteApp(db.app)
    })
    test(`データ取得`, async () => {
        const streamers = await getStreamers()

        expect(streamers).toBeDefined()
        for (const key in streamers!) {
            const streamer = streamers![key]
            expect(streamer.id).toBeDefined()
            expect(streamer.id).not.toEqual(``)
            expect(streamer.login).toBeDefined()
            expect(streamer.display_name).toBeDefined()
            expect(streamer.description).toBeDefined()
            expect(streamer.profile_image_url).toBeDefined()
        }
    })
})
