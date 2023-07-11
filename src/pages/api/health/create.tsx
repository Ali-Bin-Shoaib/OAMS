// CONNECT  DELETE  GET HEAD  OPTIONS PATCH POST  PUT TRACE
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { STATUS_CODE, REQUEST_METHODS, Education, Health } from '../../../../types';
import { Prisma, UserType } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const admin = await prisma.user.findFirst({ where: { type: UserType.ADMIN } });
	const data: Health = req.body;
	console.log('🚀 ~ file: create.tsx:10 ~ handler ~ data:', data);
	if (!data) return res.status(STATUS_CODE.BAD_REQUEST).json({ data: undefined, msg: "request don't have any data" });
	try {
		if (req.method === REQUEST_METHODS.POST) {
			const { Orphan, User, orphanId, userId, id, ...rest } = data;
			const createHealth: Prisma.HealthInfoCreateArgs = {
				data: { ...rest, User: { connect: { id: userId || admin.id } }, Orphan: { connect: { id: orphanId } } },
			};
			const newHealth = await prisma.healthInfo.create(createHealth);
			console.log('🚀 ~ file: create.tsx:21 ~ handler ~ newHealth:', newHealth);
			return res.end(res.status(STATUS_CODE.OK).json({ data: newHealth, msg: 'Create New Health info' }));
		}
	} catch (error) {
		console.log('🚀 ~ file: create.tsx:32 ~ handler ~ error:', error);
		return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'error at creating new health info', error: error });
	}
}
