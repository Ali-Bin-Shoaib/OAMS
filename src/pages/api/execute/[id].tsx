import { NextApiRequest, NextApiResponse } from 'next';
import { _ActivityInfo, _Orphan, REQUEST_METHODS, STATUS_CODE } from '../../../../types';
import prisma from '../../../../lib/prisma';
import {
	ActivityExecutionInfo,
	ActivityGoal,
	ActivityInfo,
	Goal,
	GoalEvaluation,
	Orphan,
	OrphanActivityExecution,
	User,
} from '@prisma/client';
// export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const ID = Number(req.query.id);
	console.log('🚀 ~ file: [id].tsx:9 ~ handler ~ ID:', ID);
	const isDataExist = await prisma.activityExecutionInfo.findUnique({ where: { id: ID } });
	if (!(ID || isDataExist)) return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'activity dose not exist.' });
	switch (req.method) {
		//* ************************UPDATE************************
		case REQUEST_METHODS.PUT: {
			try {
				const activityExecution: ActivityExecutionInfo & {
					Executor: User;
					ActivityInfo?: ActivityInfo & { User: User };
					GoalEvaluation?: (GoalEvaluation & { Goal?: Goal })[];
					OrphanActivityExecution?: OrphanActivityExecution[];
				} = req.body;
				console.log('🚀 ~ file: [id].tsx:45 ~ handler ~ activityExecution:', activityExecution);
				const { OrphanActivityExecution, GoalEvaluation, ActivityInfo, Executor, ...a } = activityExecution;

				const updatedExecution = await prisma.activityExecutionInfo.update({
					where: { id: ID },
					data: {
						...a,
						OrphanActivityExecution: {
							upsert: OrphanActivityExecution.map((x) => ({
								where: { id: x.id ? x.id : -1 },
								create: { evaluation: x.evaluation, isAttended: x.isAttended, orphanId: x.orphanId, userId: x.userId },
								update: { evaluation: x.evaluation, isAttended: x.isAttended, orphanId: x.orphanId, userId: x.userId },
							})),
						},
						GoalEvaluation: {
							update: GoalEvaluation.map((x) => ({
								where: {
									goalId_activityExecutionInfoId: { goalId: x.Goal.id, activityExecutionInfoId: x.activityExecutionInfoId },
								},
								data: { evaluation: x.evaluation },
							})),
						},
					},
				});
				console.log('🚀 ~ file: [id].tsx:40 ~ handler ~ updatedExecution:', updatedExecution);
				return res.status(STATUS_CODE.OK).json({
					data: updatedExecution,
					msg: `Activity execution info with ID: ${updatedExecution.id}  was updated successfully`,
				});
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:43 ~ handler ~ error:', error);
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ data: error, msg: 'Something went wrong.' });
			}
		}
		//* ************************DELETE************************

		case REQUEST_METHODS.DELETE: {
			try {
				const deletedExecution = await prisma.activityExecutionInfo.delete({ where: { id: ID } });
				console.log('🚀 ~ file: [id].tsx:31 ~ handler ~ deletedExecution:', deletedExecution);
				if (deletedExecution) {
					console.log('++++++++++++++++++++ at TRUE');

					return res.status(STATUS_CODE.OK).json({
						data: deletedExecution,
						msg: `Activity execution info with id: ${deletedExecution.id}  was deleted successfully.`,
					});
				} else {
					console.log('++++++++++++++++++++++++++ at else');
					return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'failed to delete activityExecution with id :' + ID });
				}
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:81 ~ handler ~ error:', error);
				console.log('+++++++++++++++++++++++++++++++++++ at catch error');

				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ msg: 'Some thing went wrong :', error: error });
			}
		}
		//* ************************GET************************
		case REQUEST_METHODS.GET: {
			console.log('getting orphan info');

			try {
				const requiredExecution = await prisma.activityExecutionInfo.findUnique({ where: { id: ID } });
				if (requiredExecution)
					return res.status(STATUS_CODE.OK).json({ requiredExecution: requiredExecution, msg: 'Execution Founded' });
				return res.status(STATUS_CODE.BAD_REQUEST).json('required Activity Execution was not found. with id:' + ID);
			} catch (error) {
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json('Some thing went wrong :' + error);
			}
		}
	}
}
