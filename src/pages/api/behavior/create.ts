// CONNECT  DELETE  GET HEAD  OPTIONS PATCH POST  PUT TRACE
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { STATUS_CODE, REQUEST_METHODS, Behavior } from '../../../../types';
import { Prisma, User, UserType } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/next-auth-options';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);
	console.log('🚀 ~ file: [id].tsx:13 ~ handler ~ req:', req.url);
	console.log('🚀 ~ file: [id].tsx:12 ~ handler ~ session:', session);
	if (!session || session.user.type !== (UserType.BEHAVIOR_SUPERVISOR || UserType.ADMIN)) {
		return res.status(STATUS_CODE.METHOD_NOT_ALLOWED).json({ msg: 'action not allowed' });
	}

	try {
		if (req.method === REQUEST_METHODS.POST) {
			const behavior: Behavior = req.body;
			const { id, userId, orphanId, BehaviorCriteria, date, User, note } = behavior;
			const newBehavior = await prisma.behaviorInfo.create({
				data: {
					date: date,
					note: note,
					Orphan: { connect: { id: orphanId } },
					User: { connect: { id: userId } },
					BehaviorCriteria: { create: BehaviorCriteria },
				},
			});
			return res.end(res.status(STATUS_CODE.OK).json({ data: newBehavior, msg: 'Create New Behavior' }));
		}
	} catch (error) {
		console.log('🚀 ~ file: create.tsx:20 ~ handler ~ error:', error);
		return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'error at creating new Behavior', error: error });
	}
}
