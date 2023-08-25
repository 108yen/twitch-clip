import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == 'GET') {
        try {
            const unchi = { unchi: 'うんち' };

            res.status(200).json(unchi);
        } catch (error) {
            res.status(400).json(error);
        }
    } else {
        res.status(400).json('GET method only');
    }
}