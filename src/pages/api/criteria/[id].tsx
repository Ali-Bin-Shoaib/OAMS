import { NextApiRequest, NextApiResponse } from 'next';
import { _ActivityInfo, _Orphan, REQUEST_METHODS, STATUS_CODE } from '../../../../types';
import prisma from '../../../../lib/prisma';
import { ActivityGoal, ActivityInfo, Criteria, Goal, Orphan, User, UserType } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/next-auth-options';
import user from '../user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);
	console.log('🚀 ~ file: [id].tsx:13 ~ handler ~ req:', req.url);
	console.log('🚀 ~ file: [id].tsx:12 ~ handler ~ session:', session);
	if (!session || session.user.type !== (UserType.BEHAVIOR_SUPERVISOR || UserType.ADMIN)) {
		return res.status(STATUS_CODE.METHOD_NOT_ALLOWED).json({ msg: 'action not allowed' });
	}

	const ID = Number(req.query.id);
	const criterion = await prisma.criteria.findUnique({ where: { id: ID } });
	if (!(ID || criterion)) return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'criterion dose not exist.' });
	switch (req.method) {
		//* ************************UPDATE************************
		case REQUEST_METHODS.PUT: {
			try {
				const data: Criteria & { User: User } = req.body;
				const { User, ...criterion } = data;
				console.log('🚀 ~ file: [id].tsx:18 ~ handler ~ criterion:', criterion);

				const updatedCriterion = await prisma.criteria.update({
					where: { id: ID },
					data: { ...criterion },
				});
				console.log('🚀 ~ file: [id].tsx:21 ~ handler ~ updatedCriterion:', updatedCriterion);

				return res
					.status(STATUS_CODE.OK)
					.json({ data: updatedCriterion, msg: `Criterion with id:${updatedCriterion.id} was updated successfully` });
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:24 ~ handler ~ error:', error);
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ data: error, msg: 'Something went wrong.' });
			}
		}
		//* ************************DELETE************************

		case REQUEST_METHODS.DELETE: {
			try {
				const deletedCriterion = await prisma.criteria.delete({ where: { id: ID } });
				console.log('🚀 ~ file: [id].tsx:36 ~ handler ~ deletedCriterion:', deletedCriterion);
				if (deletedCriterion) {
					return res.status(STATUS_CODE.OK).json({
						data: deletedCriterion,
						msg: `Criterion with id: ${deletedCriterion.id} and Title: ${deletedCriterion.title} was deleted successfully.`,
					});
				} else {
					return res.status(STATUS_CODE.BAD_REQUEST).json('failed to delete criterion with id :' + ID);
				}
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:49 ~ handler ~ error:', error);
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ msg: 'criterion dose not exist :', error: error });
			}
		}
		//* ************************GET************************
		case REQUEST_METHODS.GET: {
			console.log('getting criterion info');

			try {
				const requiredCriterion = await prisma.criteria.findUnique({
					where: {
						id: ID,
					},
					include: {
						BehaviorCriteria: { include: { BehaviorInfo: true } },

						User: true,
						_count: true,
					},
				});
				if (requiredCriterion)
					return res.end(res.status(STATUS_CODE.OK).json({ data: requiredCriterion, msg: 'Criterion is founded' }));

				return res.status(STATUS_CODE.BAD_REQUEST).json(`required Criterion with id: ${ID} was not found.`);
			} catch (error) {
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json('Some thing went wrong :' + error);
			}
		}
	}
}
