// CONNECT  DELETE  GET HEAD  OPTIONS PATCH POST  PUT TRACE
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { STATUS_CODE, REQUEST_METHODS, _Orphan, _Attendance } from '../../../../types';
import { Prisma, UserType } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/next-auth-options';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);
	console.log('🚀 ~ file: [id].tsx:13 ~ handler ~ req:', req.url);
	console.log('🚀 ~ file: [id].tsx:12 ~ handler ~ session:', session);
	if (session && (session.user.type === UserType.ADMIN || session.user.type === UserType.ORPHANAGE_SUPERVISOR)) {
	} else return res.status(STATUS_CODE.METHOD_NOT_ALLOWED).json({ msg: 'action not allowed' });
	const attendanceId = Number(req.query.id);
	console.log('🚀 ~ file: [id].tsx:9 ~ handler ~ req.method:', req.method);
	console.log('🚀 ~ file: [id].tsx:8 ~ handler ~ id:', attendanceId);
	const data = await prisma.attendance.findUnique({
		where: { id: attendanceId },
		include: { OrphanAttendance: true, User: true },
	});

	if (!attendanceId && !data) return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'attendance dose not exist.' });

	switch (req.method) {
		//* ************************UPDATE************************
		case REQUEST_METHODS.PUT: {
			try {
				const reqData: _Attendance = req.body;
				const { OrphanAttendance, User, id, date, userId } = reqData;
				const updateAttendance: Prisma.AttendanceUpdateArgs = {
					data: {
						date,
						userId,
						id,
						OrphanAttendance: {
							update: OrphanAttendance.map((x) => ({
								data: {
									absentReason: x.absentReason,
									justification: x.justification,
									isAttended: x.isAttended,
									returnDay: x.returnDay,
									notes: x.notes,
								},
								where: { id: x.id },
							})),
						},
					},
					where: { id },
				};
				const updatedAttendance = await prisma.attendance.update(updateAttendance);
				console.log('🚀 ~ file: [id].tsx:31 ~ handler ~ updatedAttendance:', updatedAttendance);
				return res.end(res.status(STATUS_CODE.OK).json({ data: updatedAttendance, msg: 'update success' }));
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:35 ~ handler ~ error:', error);
				return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'error at updating the attendance', error: error });
			}
		}
		//* ************************DELETE************************

		case REQUEST_METHODS.DELETE: {
			try {
				const deletedAttendance = await prisma.attendance.delete({ where: { id: attendanceId } });
				console.log('🚀 ~ file: [id].tsx:85 ~ handler ~ deletedAttendance:', deletedAttendance);
				if (deletedAttendance) {
					console.log('++++++++++++++++++++ at TRUE');

					return res.status(STATUS_CODE.OK).json({
						data: deletedAttendance,
						msg: `Attendance with id: ${deletedAttendance.id}  was deleted successfully.`,
					});
				} else {
					console.log('++++++++++++++++++++++++++ at else');
					return res.status(STATUS_CODE.BAD_REQUEST).json('failed to delete attendance with id :' + attendanceId);
				}
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:81 ~ handler ~ error:', error);
				console.log('+++++++++++++++++++++++++++++++++++ at catch error');

				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ msg: 'attendance dose not exist :', error: error });
			}
		}
		//* ************************GET************************
		case REQUEST_METHODS.GET: {
			console.log('getting attendance info');

			try {
				const requiredAttendance = await prisma.attendance.findUnique({ where: { id: attendanceId } });
				console.log('🚀 ~ file: [id].tsx:110 ~ handler ~ requiredAttendance:', requiredAttendance);
				if (requiredAttendance)
					return res.status(STATUS_CODE.OK).json({ data: requiredAttendance, msg: 'Attendance Founded' });
				return res.status(STATUS_CODE.BAD_REQUEST).json('Required Attendance not founded with id:' + attendanceId);
			} catch (error) {
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json('Some thing went wrong :' + error);
			}
		}
	}
}
