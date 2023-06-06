import { NextApiRequest, NextApiResponse } from 'next';
import { _ActivityInfo, _Orphan, REQUEST_METHODS, STATUS_CODE } from '../../../../types/types';
import prisma from '../../../../lib/prisma';
import { ActivityExecutionInfo, ActivityGoal, ActivityInfo, Goal, Orphan, User } from '@prisma/client';
// export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	console.log('🚀 ~ file: [id].tsx:8 ~ handler ~ req:', req.body);
	const ID = Number(req.query.id);
	console.log('🚀 ~ file: [id].tsx:9 ~ handler ~ ID:', ID);
	const activityExecutionInfo = await prisma.activityExecutionInfo.findUnique({ where: { id: ID } });
	console.log('🚀 ~ file: [id].tsx:12 ~ handler ~ activityExecutionInfo:', activityExecutionInfo);
	if (!(ID || activityExecutionInfo))
		return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'activity dose not exist.' });
	switch (req.method) {
		//* ************************UPDATE************************
		case REQUEST_METHODS.PUT: {
			try {
				const activityExecution: ActivityExecutionInfo & {
					ActivityGoal: (ActivityGoal & {
						Goal: Goal;
					})[];

					User: User;
				} = req.body;
				console.log('🚀 ~ file: [id].tsx:45 ~ handler ~ activityExecution:', activityExecution);

				// console.log('🚀 ~ file: [id].tsx:19 ~ handler ~ activity:', activity);
				// const { User, ActivityGoal, ...activityInfo } = activity;
				// console.log('🚀 ~ file: [id].tsx:27 ~ handler ~ activityInfo:', activityInfo);
				// console.log('🚀 ~ file: [id].tsx:27 ~ handler ~ ActivityGoal:', ActivityGoal);
				// console.log('🚀 ~ file: [id].tsx:27 ~ handler ~ User:', User);

				const updatedExecution = await prisma.activityExecutionInfo.update({
					where: { id: activityExecutionInfo.id },
					data: {
						...activityExecutionInfo,
					},
				});
				console.log('🚀 ~ file: [id].tsx:40 ~ handler ~ updatedExecution:', updatedExecution);
				return res.status(STATUS_CODE.OK).json({ data: activityExecutionInfo, msg: 'updated successfully' });
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
						msg: `execution with id: ${deletedExecution.id}  was deleted successfully.`,
					});
				} else {
					console.log('++++++++++++++++++++++++++ at else');
					return res.status(STATUS_CODE.BAD_REQUEST).json('failed to delete activityExecution with id :' + ID);
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
