// CONNECT  DELETE  GET HEAD  OPTIONS PATCH POST  PUT TRACE
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { STATUS_CODE, REQUEST_METHODS, Behavior } from '../../../../types';
import { Prisma, User } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method === REQUEST_METHODS.POST) {
			const behavior: Behavior = req.body;
			const user = await prisma.user.findFirst({ where: { type: 'ADMIN' } });
			behavior.User = user;
			const { id, userId, orphanId, BehaviorCriteria, date, User, note } = behavior;
			const newBehavior = await prisma.behaviorInfo.create({
				data: {
					date: date,
					note: note,
					Orphan: { connect: { id: orphanId } },
					User: { connect: { id: user.id } },
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
