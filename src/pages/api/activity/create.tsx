// CONNECT  DELETE  GET HEAD  OPTIONS PATCH POST  PUT TRACE
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { STATUS_CODE, REQUEST_METHODS, _Orphan, _Attendance, ActivityAndGoals } from '../../../../types/types';
import { Attendance, Orphan, Prisma, User } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const user = await prisma.user.findFirst({ where: { type: 'ADMIN' } });
	try {
		if (req.method === REQUEST_METHODS.POST) {
			const data: ActivityAndGoals = req.body;
			console.log('🚀 ~ file: create.tsx:11 ~ handler ~ data:', data);
			const { activityInfo, goals } = data;
			const newActivity = prisma.activityInfo.create({
				data: { ...activityInfo, User: { connect: { id: user?.id } } },
			});
			// const attendance: {
			// 	date: Date;
			// 	userId: number;
			// } & {
			// 	User: User | null;
			// 	OrphanAttendance: Prisma.OrphanAttendanceCreateManyAttendanceInput[];
			// } = req.body;
			// const attendance:Attendance=req.body;
			// attendance.User = user!;

			// const { User, date, OrphanAttendance, userId } = attendance;
			// console.log('🚀 ~ file: create.tsx:25 ~ handler ~ attendance:', attendance);

			// const newAttendance = await prisma.attendance.create({
			// 	data: {
			// 		date: date,
			// 		User: { connect: { id: User.id } },
			// 		OrphanAttendance: { createMany: { data: OrphanAttendance } },
			// 	},
			// });
			return res.end(res.status(STATUS_CODE.OK).json({ data: newActivity }));
		}
	} catch (error) {
		console.log('🚀 ~ file: create.tsx:32 ~ handler ~ error:', error);
		return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'error at creating new attendance', error: error });
	}
}
