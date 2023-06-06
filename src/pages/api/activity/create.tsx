// CONNECT  DELETE  GET HEAD  OPTIONS PATCH POST  PUT TRACE
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { STATUS_CODE, REQUEST_METHODS, _Attendance, _ActivityInfo, } from '../../../../types/types';
import { ActivityGoal, Prisma, User, Goal } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const user = await prisma.user.findFirst({ where: { type: 'ADMIN' } });
	try {
		if (req.method === REQUEST_METHODS.POST) {
			// const data: _ActivityInfo = req.body;
			const data: Prisma.ActivityInfoCreateInput & {
				User: User;
				ActivityGoal: (ActivityGoal & {
					Goal: Goal;
				})[];
			} = req.body;
			// const { ActivityGoal, date, User, budget, quarter, selectedGoals, target, title, type } = data;
			const { ActivityGoal, User, ...activityInfo } = data;
			console.log("🚀 ~ file: create.tsx:20 ~ handler ~ data:", data);
			const newActivity = await prisma.activityInfo.create({
				data: {
					// ...data,
					...activityInfo,
					// userId: user.id,
					User: { connect: { id: user?.id } },
					ActivityGoal: { create: ActivityGoal }
				},
			});
			console.log('🚀 ~ file: create.tsx:17 ~ handler ~ newActivity:', newActivity);
			return res.end(res.status(STATUS_CODE.OK).json({ data: newActivity, msg: 'new activity created successfully' }));
		}
	} catch (error) {
		console.log('🚀 ~ file: create.tsx:32 ~ handler ~ error:', error);
		return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'error at creating new attendance', error: error });
	}
}
