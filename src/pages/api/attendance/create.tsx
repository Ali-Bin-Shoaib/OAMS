// CONNECT  DELETE  GET HEAD  OPTIONS PATCH POST  PUT TRACE
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { STATUS_CODE, REQUEST_METHODS, _Orphan, _Attendance } from '../../../../types';
import { Attendance, Orphan, Prisma, User } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/next-auth-options';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);
	console.log('🚀 ~ file: [id].tsx:13 ~ handler ~ req:', req.url);
	console.log('🚀 ~ file: [id].tsx:12 ~ handler ~ session:', session);
	if (!session || session.user.type != ('ORPHANAGE_SUPERVISOR' && 'ADMIN')) {
		return res.status(STATUS_CODE.METHOD_NOT_ALLOWED).json({ msg: 'action not allowed' });
	}

	try {
		if (req.method === REQUEST_METHODS.POST) {
			const attendance: {
				date: Date;
				userId: number;
			} & {
				User: User | null;
				OrphanAttendance: Prisma.OrphanAttendanceCreateManyAttendanceInput[];
			} = req.body;
			// const attendance:Attendance=req.body;

			const { User, date, OrphanAttendance, userId } = attendance;
			console.log('🚀 ~ file: create.tsx:25 ~ handler ~ attendance:', attendance);

			const newAttendance = await prisma.attendance.create({
				data: {
					date: date,
					User: { connect: { id: userId } },
					OrphanAttendance: { createMany: { data: OrphanAttendance.filter((x) => !x.isAttended) } },
				},
			});
			console.log('🚀 ~ file: create.tsx:27 ~ handler ~ newAttendance:', newAttendance);
			return res.end(res.status(STATUS_CODE.OK).json({ data: newAttendance, msg: 'Create New Attendance' }));
		}
	} catch (error) {
		console.log('🚀 ~ file: create.tsx:32 ~ handler ~ error:', error);
		return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'error at creating new attendance', error: error });
	}
}
