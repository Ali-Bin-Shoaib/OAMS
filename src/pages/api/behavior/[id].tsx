import { NextApiRequest, NextApiResponse } from 'next';
import { _ActivityInfo, _Orphan, Behavior, REQUEST_METHODS, STATUS_CODE } from '../../../../types';
import prisma from '../../../../lib/prisma';
import { ActivityGoal, ActivityInfo, Goal, Orphan, Prisma, User } from '@prisma/client';
// export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const ID = Number(req.query.id);
	console.log('🚀 ~ file: [id].tsx:9 ~ handler ~ ID:', ID);
	switch (req.method) {
		//* ************************UPDATE************************
		case REQUEST_METHODS.PUT: {
			const behavior = await prisma.behaviorInfo.findUnique({ where: { id: ID } });
			if (!(ID || behavior)) return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'behavior dose not exist.' });

			try {
				const behavior: Behavior = req.body;

				const { userId, orphanId, date, note, BehaviorCriteria, User, id } = behavior;
				const updateBehavior: Prisma.BehaviorInfoUpdateArgs = {
					data: {
						BehaviorCriteria: {
							update: BehaviorCriteria.map((x) => ({
								where: { id: x.id },
								data: { criteriaId: x.criteriaId, evaluation: x.evaluation, userId: x.userId },
							})),
						},
						date: date,
						note: note,
						Orphan: { connect: { id: orphanId } },
						User: { connect: { id: userId } },
					},
					where: { id: id },
				};

				const updatedBehavior = await prisma.behaviorInfo.update(updateBehavior);
				console.log('🚀 ~ file: [id].tsx:50 ~ handler ~ updatedBehavior:', updatedBehavior);
				return res
					.status(STATUS_CODE.OK)
					.json({ data: updatedBehavior, msg: `Behavior with id:${updatedBehavior.id} update successfully` });
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:31 ~ handler ~ error:', error);
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ data: error, msg: 'Something went wrong.' });
			}
		}
		//* ************************DELETE************************

		case REQUEST_METHODS.DELETE: {
			try {
				const deletedBehavior = await prisma.behaviorInfo.delete({ where: { id: ID } });
				console.log('🚀 ~ file: [id].tsx:40 ~ handler ~ deletedBehavior:', deletedBehavior);
				if (deletedBehavior) {
					console.log('++++++++++++++++++++ at TRUE');

					return res.status(STATUS_CODE.OK).json({
						data: deletedBehavior,
						msg: `Behavior with id: ${deletedBehavior.id}  was deleted successfully.`,
					});
				} else {
					console.log('++++++++++++++++++++++++++ at else');
					return res.status(STATUS_CODE.BAD_REQUEST).json('failed to delete behavior with id :' + ID);
				}
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:81 ~ handler ~ error:', error);
				console.log('+++++++++++++++++++++++++++++++++++ at catch error');

				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ msg: 'behavior dose not exist :', error: error });
			}
		}
		//* ************************GET************************
		case REQUEST_METHODS.GET: {
			console.log('getting behavior info');

			try {
				const requiredBehavior = await prisma.behaviorInfo.findUnique({ where: { id: ID } });
				if (requiredBehavior)
					return res.status(STATUS_CODE.OK).json({ requiredActivity: requiredBehavior, msg: 'Behavior Founded' });
				return res.status(STATUS_CODE.BAD_REQUEST).json('Required Behavior not founded with id:' + ID);
			} catch (error) {
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json('Some thing went wrong :' + error);
			}
		}
	}
}
