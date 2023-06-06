// CONNECT  DELETE  GET HEAD  OPTIONS PATCH POST  PUT TRACE
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { STATUS_CODE, REQUEST_METHODS, _Orphan, _Attendance } from '../../../../types/types';
import { Attendance, Orphan, OrphanAttendance, Prisma, User } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const attendanceId = Number(req.query.id);
	console.log('🚀 ~ file: [id].tsx:8 ~ handler ~ id:', attendanceId);
	const data = await prisma.attendance.findUnique({
		where: { id: attendanceId },
		include: { OrphanAttendance: true, User: true },
	});

	if (!data) return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'attendance dose not exist.' });

	try {
		if (req.method === REQUEST_METHODS.PUT) {
			const reqData: Attendance & {
				OrphanAttendance: (OrphanAttendance & {
					// Orphan?: Orphan;
				})[];
				User: User;
			} = req.body;
			const user = await prisma.user.findFirst();
			reqData.User = user!;

			const { OrphanAttendance, User, id: attendanceId, date, userId } = reqData;

			// const test: OrphanAttendance[] = [];
			let attendAbsentOrphan;
			OrphanAttendance.map(async (x) => {
				// x.id && x.isAttended && console.log('attendAbsentOrphans' + await prisma.orphanAttendance.delete({ where: { id: x.id } }));

				if (x.id) {
					if (x.isAttended) {
						const attendAbsentOrphan = await prisma.orphanAttendance.delete({ where: { id: x.id } });
						console.log("🚀 ~ file: [id].tsx:35 ~ OrphanAttendance.map ~ attendAbsentOrphan:", attendAbsentOrphan);
					}
				}
			});
			// const absentOrphans = OrphanAttendance.filter((x) => x.isAttended == false);
			// absentOrphans.map(async (x) => {
			// 	let y = await prisma.orphanAttendance.upsert({
			// 		where: { id: x.id ? x.id : -1 },
			// 		create: {
			// 			// id:x.id,
			// 			Attendance: { connect: { id: attendanceId } },
			// 			absentReason: x.absentReason,
			// 			isAttended: x.isAttended,
			// 			justification: x.justification,
			// 			notes: x.notes,
			// 			User: { connect: { id: userId } },
			// 			returnDay: x.returnDay,
			// 			Orphan: { connect: { id: x.orphanId as number } },
			// 		},
			// 		update: {
			// 			absentReason: x.absentReason,
			// 			justification: x.justification,
			// 			isAttended: x.isAttended,
			// 			returnDay: x.returnDay,
			// 			notes: x.notes,
			// 			User: { connect: { id: userId } },
			// 			Orphan: { connect: { id: x.orphanId as number } },
			// 		},
			// 	});

			// 	test.push(y);
			// });
			const updatedAttendance = await prisma.attendance.update({
				where: { id: attendanceId },
				data: {
					date: date,
					User: { connect: { id: userId } },
					OrphanAttendance: {
						upsert: OrphanAttendance.filter((x) => x.isAttended === false).map((x) => ({
							where: { id: x.id ? x.id : -1 },
							create: {
								absentReason: x.absentReason,
								isAttended: x.isAttended,
								justification: x.justification,
								notes: x.notes,
								User: { connect: { id: userId } },
								returnDay: x.returnDay,
								Orphan: { connect: { id: x.orphanId as number } },

							},
							update: {
								absentReason: x.absentReason,
								justification: x.justification,
								isAttended: x.isAttended,
								returnDay: x.returnDay,
								notes: x.notes,
								User: { connect: { id: userId } },
								Orphan: { connect: { id: x.orphanId as number } },

							}
						})),
						deleteMany: { isAttended: true }
						// updateMany: { where: { attendanceId: attendanceId }, data: test }
					},
				},
			});

			console.log('🚀 ~ file: [id].tsx:31 ~ handler ~ updatedAttendance:', updatedAttendance);
			return res.end(res.status(STATUS_CODE.OK).json({ data: updatedAttendance, msg: 'update success' }));
		}
	} catch (error) {
		console.log('🚀 ~ file: [id].tsx:35 ~ handler ~ error:', error);
		return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'error at updating the attendance', error: error });
	}
}
