// CONNECT  DELETE  GET HEAD  OPTIONS PATCH POST  PUT TRACE
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { STATUS_CODE, REQUEST_METHODS, _Attendance, _ActivityInfo, } from '../../../../types/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === REQUEST_METHODS.GET) {
            // const data: _ActivityInfo = req.body;
            const data = await prisma.activityInfo.findMany({
                include: {
                    ActivityGoal: {
                        include: {
                            Goal: true
                        }
                    }, User: true
                }, orderBy: { id: 'asc' }
            })
            console.log("🚀 ~ file: index.tsx:12 ~ handler ~ data:", data);
            return res.end(res.status(STATUS_CODE.OK).json({ data: data, msg: 'getting all activity successfully' }));
        }
    } catch (error) {
        console.log("🚀 ~ file: index.tsx:16 ~ handler ~ error:", error);
        return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'error at getting activities', error: error });
    }
}
