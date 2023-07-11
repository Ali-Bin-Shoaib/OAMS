// CONNECT  DELETE  GET HEAD  OPTIONS PATCH POST  PUT TRACE
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { STATUS_CODE, REQUEST_METHODS, _Attendance, _ActivityInfo, _ActivityExecutionInfo } from '../../../../types';
import { Goal, ActivityGoal, Prisma, User, ActivityExecutionInfo, ActivityInfo, GoalEvaluation } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const user = await prisma.user.findFirst({ where: { type: 'ADMIN' } });
	try {
		if (req.method === REQUEST_METHODS.POST) {
			const data: _ActivityExecutionInfo = req.body;
			console.log('🚀 ~ file: create.tsx:12 ~ handler ~ data:', data);
			const { GoalEvaluation, activityInfoId, id, userId, cost, description, note, startDate, OrphanActivityExecution } =
				data;
			const newActivityExecution = await prisma.activityExecutionInfo.create({
				data: {
					cost: cost as number,
					description: description,
					note: note,
					startDate: startDate,
					ActivityInfo: { connect: { id: activityInfoId } },
					Executor: { connect: { id: userId } },
					GoalEvaluation: {
						create: GoalEvaluation?.map((x) => ({
							evaluation: x.evaluation,
							Goal: { connect: { id: x.Goal.id } },
						})),
					},
					OrphanActivityExecution: {
						create: OrphanActivityExecution?.map((x) => ({
							orphanId: x.Orphan.id,
							isAttended: x.isAttended as unknown as boolean,
							userId: userId,
							activityInfoId: x.activityExecutionInfoId,
							evaluation: x.evaluation,
						})),
					},
				},
			});
			// OrphanActivityExecution: {
			// 	create: OrphanActivityExecution?.filter((x) => x.isAttended).map((x) => ({
			// 		orphanId: x.Orphan.id,
			// 		userId: userId,
			// 		activityInfoId: x.activityExecutionInfoId,
			// 		evaluation: x.evaluation,
			// 	})),
			// },

			console.log('🚀 ~ file: create.tsx:17 ~ handler ~ newActivityExecution:', newActivityExecution);
			return res.end(
				res.status(STATUS_CODE.OK).json({ data: newActivityExecution, msg: 'new activity created successfully' })
			);
		}
	} catch (error) {
		console.log('🚀 ~ file: create.tsx:21 ~ handler ~ error:', error);
		return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'error at creating new attendance', error: error });
	}
}
