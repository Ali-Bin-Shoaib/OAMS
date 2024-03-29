import { NextApiRequest, NextApiResponse } from 'next';
import { _ActivityInfo, _Orphan, REQUEST_METHODS, STATUS_CODE } from '../../../../types';
import prisma from '../../../../lib/prisma';
import { ActivityGoal, ActivityInfo, Goal, Orphan, Prisma, User, UserType } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/next-auth-options';
// export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);
	console.log('🚀 ~ file: [id].tsx:13 ~ handler ~ req:', req.url);
	console.log('🚀 ~ file: [id].tsx:12 ~ handler ~ session:', session);
	if (session && (session.user.type === UserType.ADMIN || session.user.type === UserType.ACTIVITY_SUPERVISOR)) {
	} else return res.status(STATUS_CODE.METHOD_NOT_ALLOWED).json({ msg: 'action not allowed' });
	const ID = Number(req.query.id);
	console.log('🚀 ~ file: [id].tsx:9 ~ handler ~ ID:', ID);
	const activity = await prisma.activityInfo.findUnique({ where: { id: ID } });
	console.log('🚀 ~ file: [id].tsx:11 ~ handler ~ activity:', activity);
	if (!ID || !activity) return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'activity dose not exist.' });
	switch (req.method) {
		//* ************************UPDATE************************
		case REQUEST_METHODS.PUT: {
			try {
				const activity: ActivityInfo & {
					ActivityGoal: (ActivityGoal & { Goal: Goal })[];
					User: User;
				} = req.body;

				console.log('🚀 ~ file: [id].tsx:19 ~ handler ~ activity:', activity);
				const { User, ActivityGoal, id, ...activityInfo } = activity;
				console.log('🚀 ~ file: [id].tsx:27 ~ handler ~ activityInfo:', activityInfo);
				console.log('🚀 ~ file: [id].tsx:27 ~ handler ~ ActivityGoal:', ActivityGoal);

				const updatedActivity = await prisma.activityInfo.update({
					where: { id: id },
					data: {
						...activityInfo,
						ActivityGoal: {
							deleteMany: { goalId: { notIn: ActivityGoal.map((x) => x.goalId as number) } },
							upsert: ActivityGoal.map((x) => ({
								where: {
									// goalId_activityInfoId: { goalId: x.goalId, activityInfoId: activityInfo.id }
									goalId_activityInfoId: { goalId: x.goalId as number, activityInfoId: id },
								},
								create: {
									Goal: { connect: { id: x.goalId as number } },
								},
								update: {
									Goal: { connect: { id: x.goalId as number } },
								},
							})),
						},
					},
				});
				console.log('🚀 ~ file: [id].tsx:54 ~ handler ~ updatedActivity:', updatedActivity);
				return res
					.status(STATUS_CODE.OK)
					.json({ data: updatedActivity, msg: `activity with id:${updatedActivity.id} update success` });
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:24 ~ handler ~ error:', error);
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ data: error, msg: 'Something went wrong.' });
			}
		}
		//* ************************DELETE************************

		case REQUEST_METHODS.DELETE: {
			try {
				console.log('🚀 ~ file: [id].tsx:66 ~ handler ~ ID:', ID);
				const deletedActivity = await prisma.activityInfo.delete({ where: { id: ID } });
				console.log('🚀 ~ file: [id].tsx:31 ~ handler ~ deletedActivity:', deletedActivity);
				if (deletedActivity) {
					console.log('++++++++++++++++++++ at TRUE');

					return res.status(STATUS_CODE.OK).json({
						data: deletedActivity,
						msg: `activity with id: ${deletedActivity.id} and Title: ${deletedActivity.title} was deleted successfully.`,
					});
				} else {
					console.log('++++++++++++++++++++++++++ at else');
					return res.status(STATUS_CODE.BAD_REQUEST).json('failed to delete activity with id :' + ID);
				}
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:81 ~ handler ~ error:', error);
				console.log('+++++++++++++++++++++++++++++++++++ at catch error');

				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ msg: 'activity dose not exist :', error: error });
			}
		}
		//* ************************GET************************
		case REQUEST_METHODS.GET: {
			console.log('getting orphan info');

			try {
				const requiredActivity = await prisma.activityInfo.findUnique({ where: { id: ID } });
				if (requiredActivity)
					return res.status(STATUS_CODE.OK).json({ requiredActivity: requiredActivity, msg: 'Activity Founded' });
				return res.status(STATUS_CODE.BAD_REQUEST).json('required Activity not founded with id:' + ID);
			} catch (error) {
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json('Some thing went wrong :' + error);
			}
		}
	}
}
