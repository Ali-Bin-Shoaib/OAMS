// CONNECT  DELETE  GET HEAD  OPTIONS PATCH POST  PUT TRACE
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { STATUS_CODE, REQUEST_METHODS, _Attendance, _ActivityInfo } from '../../../../types';
import { ActivityGoal, Prisma, User, Goal, UserType } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/next-auth-options';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);
	console.log('🚀 ~ file: [id].tsx:13 ~ handler ~ req:', req.url);
	console.log('🚀 ~ file: [id].tsx:12 ~ handler ~ session:', session);
	if (!session || session.user.type !== (UserType.ACTIVITY_SUPERVISOR || UserType.ADMIN)) {
		return res.status(STATUS_CODE.METHOD_NOT_ALLOWED).json({ msg: 'action not allowed' });
	}

	try {
		if (req.method === REQUEST_METHODS.POST) {
			const goal: Goal = req.body;
			const newGoal = await prisma.goal.create({ data: goal });
			console.log('🚀 ~ file: create.tsx:17 ~ handler ~ newGoal:', newGoal);
			return res.end(res.status(STATUS_CODE.OK).json({ data: newGoal, msg: 'new goal was created successfully' }));
		}
	} catch (error) {
		console.log('🚀 ~ file: create.tsx:32 ~ handler ~ error:', error);
		return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'error at creating new attendance', error: error });
	}
}
