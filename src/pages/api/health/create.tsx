// CONNECT  DELETE  GET HEAD  OPTIONS PATCH POST  PUT TRACE
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { STATUS_CODE, REQUEST_METHODS, Education, Health } from '../../../../types';
import { Prisma, UserType } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/next-auth-options';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);
	console.log('🚀 ~ file: [id].tsx:13 ~ handler ~ req:', req.url);
	console.log('🚀 ~ file: [id].tsx:12 ~ handler ~ session:', session);
	if (!session || session.user.type !== ('ADMIN' && 'HEALTH_SUPERVISOR')) {
		return res.status(STATUS_CODE.METHOD_NOT_ALLOWED).json({ msg: 'action not allowed' });
	}

	const data: Health = req.body;
	console.log('🚀 ~ file: create.tsx:10 ~ handler ~ data:', data);
	if (!data) return res.status(STATUS_CODE.BAD_REQUEST).json({ data: undefined, msg: "request don't have any data" });
	try {
		if (req.method === REQUEST_METHODS.POST) {
			const { Orphan, User, orphanId, userId, id, ...rest } = data;
			const createHealth: Prisma.HealthInfoCreateArgs = {
				data: { ...rest, User: { connect: { id: userId } }, Orphan: { connect: { id: orphanId } } },
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
