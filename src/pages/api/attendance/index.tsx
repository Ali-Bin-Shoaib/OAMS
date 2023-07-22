import { NextApiRequest, NextApiResponse } from 'next';
import { REQUEST_METHODS, STATUS_CODE } from '../../../../types';
import prisma from '../../../../lib/prisma';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'GET': {
			try {
				const attendance = await prisma.attendance.findMany({
					select: { id: true, date: true, User: { select: { id: true, name: true } }, OrphanAttendance: true },
					orderBy: { id: 'asc' },
				});
				return res.end(res.status(STATUS_CODE.OK).json({ data: attendance, message: 'get all attendance' }));
			} catch (error) {
				console.log('🚀 ~ file: index.tsx:12 ~ handler ~ error:', error);
			}
			break;
		}
	}
}
