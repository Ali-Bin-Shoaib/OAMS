// CONNECT  DELETE  GET HEAD  OPTIONS PATCH POST  PUT TRACE
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { STATUS_CODE, REQUEST_METHODS, Education } from '../../../../types';
import { Orphan, Prisma, UserType } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/next-auth-options';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);
	console.log('🚀 ~ file: [id].tsx:13 ~ handler ~ req:', req.url);
	console.log('🚀 ~ file: [id].tsx:12 ~ handler ~ session:', session);
	if (session) {
		console.log('+++++++++++++++', session.user.type !== 'ADMIN' && session.user.type !== 'EDUCATION_SUPERVISOR');

		if (session.user.type !== 'ADMIN' && session.user.type !== 'EDUCATION_SUPERVISOR') {
			return res.status(STATUS_CODE.METHOD_NOT_ALLOWED).json({ msg: 'action not allowed' });
		}
	}

	const data: Education = req.body;
	console.log('🚀 ~ file: create.tsx:10 ~ handler ~ data:', data);
	if (!data) return res.status(STATUS_CODE.BAD_REQUEST).json({ data: undefined, msg: "request don't have any data" });
	try {
		if (req.method === REQUEST_METHODS.POST) {
			const { Orphan, User, id, orphanId, userId, scoreSheet, ...rest } = data;
			// if (orphanId) {
			// 	const updateOrphanSchoolName: Orphan = await prisma.orphan.update({
			// 		where: { id: orphanId },
			// 		data: { schoolName: Orphan?.schoolName },
			// 	});
			// 	console.log('🚀 ~ file: create.tsx:20 ~ handler ~ updateOrphanSchoolName:', updateOrphanSchoolName);
			// }
			const createEducation: Prisma.EducationInfoCreateInput = {
				...rest,
				scoreSheet: null,
				User: { connect: { id: userId } },
				Orphan: { connect: { id: orphanId } },
				// userId: admin.id,
				// orphanId: Orphan.id,
			};
			console.log('🚀 ~ file: create.tsx:17 ~ handler ~ createEducation:', createEducation);

			const newEducation = await prisma.educationInfo.create({
				data: createEducation,
			});
			console.log('🚀 ~ file: create.tsx:25 ~ handler ~ newEducation:', newEducation);
			return res.end(res.status(STATUS_CODE.OK).json({ data: newEducation, msg: 'Create New Education info' }));
		}
	} catch (error) {
		console.log('🚀 ~ file: create.tsx:32 ~ handler ~ error:', error);
		return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'error at creating new education info', error: error });
	}
}
