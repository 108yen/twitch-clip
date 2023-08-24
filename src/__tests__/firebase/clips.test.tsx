import { db } from "@/firebase/client"
import getClips from "@/firebase/clips"
import { ClipDoc } from "@/models/clipDoc"
import { deleteApp } from "firebase/app"

function checkClipDoc(
    clipDoc: ClipDoc | undefined,
    periods: Array<string>,
    clipListLengthGreaterThanOrEqual: number,
) {
    expect(clipDoc).toBeDefined();

    for (const key in periods) {
        const period = periods[key];
        const periodClipList = clipDoc![period];
        expect(periodClipList).toBeDefined();
        expect(periodClipList!.length).toBeGreaterThanOrEqual(clipListLengthGreaterThanOrEqual);

        for (let index = 0; index < periodClipList!.length; index++) {
            const clip = periodClipList![index];
            expect(clip.id).toBeDefined();
            expect(clip.url).toBeDefined();
            expect(clip.embed_url).toBeDefined();
            expect(clip.broadcaster_id).toBeDefined();
            expect(clip.creator_name).toBeDefined();
            expect(clip.title).toBeDefined();
            expect(clip.view_count).toBeDefined();
            expect(clip.created_at).toBeDefined();
            expect(clip.thumbnail_url).toBeDefined();
        }
    }
}

describe('checkClipDocのテスト', () => {
    afterAll(() => {
        deleteApp(db.app);
    })
    test('summaryデータ取得', async () => {
        const periods = ['day', 'week', 'month', 'year', 'all'];
        const summaryClipDoc = await getClips('summary');
        checkClipDoc(summaryClipDoc, periods, 100);
    })
    test('past_summaryデータ取得', async () => {
        const current_year = new Date().getFullYear();
        const periods: Array<string> = [];
        for (let year = 2016; year < current_year; year++) {
            periods.push(year.toString());
        }
        const pastSummaryClipDoc = await getClips('past_summary');
        checkClipDoc(pastSummaryClipDoc, periods, 100);
    })
    test('釈迦のデータ取得', async () => {
        const current_year = new Date().getFullYear();
        const periods: Array<string> = ['day', 'week', 'month', 'year', 'all'];
        for (let year = 2016; year < current_year; year++) {
            periods.push(year.toString());
        }
        const id = '49207184';

        const streamerClipDoc = await getClips(id);
        checkClipDoc(streamerClipDoc, periods, 70);
    })
    test('存在しないデータの取得', async () => {
        const clipDoc = await getClips('dont exist');
        expect(clipDoc).toBeUndefined();
    })
})