// CONNECT  DELETE  GET HEAD  OPTIONS PATCH POST  PUT TRACE
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { STATUS_CODE, REQUEST_METHODS, _Attendance, _ActivityInfo } from '../../../../types';
import { Criteria, UserType } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const admin = await prisma.user.findFirst({ where: { type: UserType.ADMIN } });
	try {
		if (req.method === REQUEST_METHODS.POST) {
			const criteria: Criteria = req.body;
			criteria.userId = admin.id;
			const newCriteria = await prisma.criteria.create({ data: criteria });
			console.log('🚀 ~ file: create.tsx:12 ~ handler ~ newCriteria:', newCriteria);
			return res.end(
				res.status(STATUS_CODE.OK).json({ data: newCriteria, msg: 'new criterion was created successfully' })
			);
		}
	} catch (error) {
		console.log('🚀 ~ file: create.tsx:16 ~ handler ~ error:', error);
		return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'error at creating new criterion', error: error });
	}
}
