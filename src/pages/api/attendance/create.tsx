// CONNECT  DELETE  GET HEAD  OPTIONS PATCH POST  PUT TRACE
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { STATUS_CODE, REQUEST_METHODS, _Orphan } from '../../../../types/types';
import { Attendance, Orphan, OrphanAttendance, Prisma } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method === REQUEST_METHODS.POST) {
			const x: Attendance = req.body;
			// const newAttendance = await prisma.attendance.create({
			// 	data: attendance,
			// 	include: { User: true, OrphanAttendance: { include: { Orphan: true } } },
			// });
			// const newAttendance = await prisma.orphanAttendance.create({
			// 	data: x,
			// 	include: { Attendance: true, Orphan: true },
			// });
			const newAttendance = await prisma.attendance.create({
				data: x,
				include: { OrphanAttendance: { include: { Orphan: true } }, User: true },
			});
			return res.end(res.status(STATUS_CODE.OK).json({ data: newAttendance }));
		}
	} catch (error) {
		return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'error at creating new attendance', error: error });
		// return res.end(res.status(STATUS_CODE.BAD_REQUEST).json(error));
	}
}
