// CONNECT  DELETE  GET HEAD  OPTIONS PATCH POST  PUT TRACE
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { STATUS_CODE, REQUEST_METHODS, _Attendance, _ActivityInfo } from '../../../../types/types';
import { ActivityGoal, Prisma, User, Goal } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
