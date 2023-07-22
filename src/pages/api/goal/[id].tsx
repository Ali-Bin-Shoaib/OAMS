import { NextApiRequest, NextApiResponse } from 'next';
import { _ActivityInfo, _Orphan, REQUEST_METHODS, STATUS_CODE } from '../../../../types';
import prisma from '../../../../lib/prisma';
import { ActivityGoal, ActivityInfo, Goal, Orphan, User, UserType } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/next-auth-options';
import user from '../user';
// export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);
	console.log('🚀 ~ file: [id].tsx:13 ~ handler ~ req:', req.url);
	console.log('🚀 ~ file: [id].tsx:12 ~ handler ~ session:', session);
	if (!session || session.user.type !== (UserType.ACTIVITY_SUPERVISOR || UserType.ADMIN)) {
		return res.status(STATUS_CODE.METHOD_NOT_ALLOWED).json({ msg: 'action not allowed' });
	}

	const ID = Number(req.query.id);
	const goal = await prisma.goal.findUnique({ where: { id: ID } });
	if (!(ID || goal)) return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'goal dose not exist.' });
	switch (req.method) {
		//* ************************UPDATE************************
		case REQUEST_METHODS.PUT: {
			try {
				const data: Goal & { User: User } = req.body;
				const { User, ...goal } = data;
				console.log('🚀 ~ file: [id].tsx:16 ~ handler ~ goal:', goal);

				const updatedGoal = await prisma.goal.update({ where: { id: ID }, data: { ...goal } });
				console.log('🚀 ~ file: [id].tsx:19 ~ handler ~ updatedGoal:', updatedGoal);

				return res
					.status(STATUS_CODE.OK)
					.json({ data: updatedGoal, msg: `goal with id:${updatedGoal.id} was updated successfully` });
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:24 ~ handler ~ error:', error);
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ data: error, msg: 'Something went wrong.' });
			}
		}
		//* ************************DELETE************************

		case REQUEST_METHODS.DELETE: {
			try {
				const deletedGoal = await prisma.goal.delete({ where: { id: ID } });
				console.log('🚀 ~ file: [id].tsx:32 ~ handler ~ deletedGoal:', deletedGoal);
				if (deletedGoal) {
					return res.status(STATUS_CODE.OK).json({
						data: deletedGoal,
						msg: `Goal with id: ${deletedGoal.id} and Title: ${deletedGoal.title} was deleted successfully.`,
					});
				} else {
					return res.status(STATUS_CODE.BAD_REQUEST).json('failed to delete goal with id :' + ID);
				}
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:81 ~ handler ~ error:', error);
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ msg: 'activity dose not exist :', error: error });
			}
		}
		//* ************************GET************************
		case REQUEST_METHODS.GET: {
			console.log('getting orphan info');

			try {
				const requiredGoal = await prisma.goal.findUnique({
					where: {
						id: ID,
					},
					include: {
						GoalEvaluation: true,
						ActivityGoal: { include: { ActivityInfo: { select: { id: true, title: true } } } },
						User: true,
						_count: true,
					},
				});
				if (requiredGoal) return res.end(res.status(STATUS_CODE.OK).json({ data: requiredGoal, msg: 'Goal Founded' }));

				return res.status(STATUS_CODE.BAD_REQUEST).json(`required Goal with id: ${ID} was not found.`);
			} catch (error) {
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json('Some thing went wrong :' + error);
			}
		}
	}
}
