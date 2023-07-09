// CONNECT  DELETE  GET HEAD  OPTIONS PATCH POST  PUT TRACE
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { STATUS_CODE, REQUEST_METHODS, Education } from '../../../../types';
import { Prisma, UserType } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const admin = await prisma.user.findFirst({ where: { type: UserType.ADMIN } });
	const data: Education = req.body;
	console.log('🚀 ~ file: create.tsx:10 ~ handler ~ data:', data);
	data.scoreSheet = null;
	data.userId = admin.id;
	if (!data) return res.status(STATUS_CODE.BAD_REQUEST).json({ data: undefined, msg: "request don't have any data" });
	try {
		if (req.method === REQUEST_METHODS.POST) {
			const { Orphan, User, id, scoreSheet, ...rest } = data;
			const createEducation: Prisma.EducationInfoCreateInput = {
				...rest,
				scoreSheet: null,
				// User: { connect: { id: admin.id } },
				// Orphan: { connect: { id: Orphan.id } },
			};
			const newBehavior = await prisma.educationInfo.create({
				data: createEducation,
			});
			console.log('🚀 ~ file: create.tsx:25 ~ handler ~ newBehavior:', newBehavior);
			return res.end(res.status(STATUS_CODE.OK).json({ data: newBehavior, msg: 'Create New Behavior info' }));
		}
	} catch (error) {
		console.log('🚀 ~ file: create.tsx:32 ~ handler ~ error:', error);
		return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'error at creating new education info', error: error });
	}
}
