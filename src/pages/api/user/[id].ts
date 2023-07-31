import { NextApiRequest, NextApiResponse } from 'next';
import { _ActivityInfo, _Orphan, _User, REQUEST_METHODS, STATUS_CODE } from '../../../../types';
import prisma from '../../../../lib/prisma';
import { Prisma, UserType } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/next-auth-options';
import user from '.';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
// export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	console.log('🚀 ~ file: [id].tsx:11 ~ handler ~ req.body:', req.body);
	const session = await getServerSession(req, res, authOptions);
	console.log('🚀 ~ file: [id].tsx:13 ~ handler ~ req:', req.url);
	console.log('🚀 ~ file: [id].tsx:12 ~ handler ~ session:', session);
	if (!session || session.user.type !== UserType.ADMIN)
		return res.status(STATUS_CODE.METHOD_NOT_ALLOWED).json({ msg: 'action not allowed' });

	const ID = Number(req.query.id);
	const user = await prisma.user.findUnique({ where: { id: ID } });
	if (!(ID || user)) return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'guardian dose not exist.' });
	switch (req.method) {
		//* ************************UPDATE************************
		case REQUEST_METHODS.PUT: {
			try {
				const bigUser: _User = req.body;
				const { guardian, sponsor, ...user } = bigUser;
				if (user.type === 'GUARDIAN') {
					const updatedGuardian = await prisma.user.update({
						where: { id: user.id },
						data: { ...user, Guardian: { update: guardian } },
					});
					console.log('🚀 ~ file: [id].tsx:34 ~ handler ~ updatedGuardian:', updatedGuardian);

					return res.end(res.status(STATUS_CODE.OK).json({ data: updatedGuardian, msg: 'update Guardian successfully' }));
				}
				if (user.type === 'SPONSOR') {
					const updatedSponsor = await prisma.user.update({
						where: { id: user.id },
						data: { ...user, Sponsor: { update: sponsor } },
					});
					console.log('🚀 ~ file: [id].tsx:41 ~ handler ~ updatedSponsor:', updatedSponsor);
					return res.end(res.status(STATUS_CODE.OK).json({ data: updatedSponsor, msg: 'create Sponsor successfully' }));
				}
				const updateUser = await prisma.user.update({
					where: { id: user.id },
					data: { ...user },
				});
				console.log('🚀 ~ file: [id].tsx:48 ~ handler ~ updateUser:', updateUser);
				return res.status(STATUS_CODE.OK).json({ data: user, msg: `User with id:${user.id} was updated successfully` });
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:24 ~ handler ~ error:', error);
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ data: error, msg: 'Something went wrong.' });
			}
		}
		//* ************************DELETE************************

		case REQUEST_METHODS.DELETE: {
			try {
				console.log('🚀 ~ file: [id].tsx:60 ~ handler ~ ID:', ID);
				const deletedUser = await prisma.user.delete({ where: { id: ID } });
				console.log('🚀 ~ file: [id].tsx:60 ~ handler ~ deletedUser:', deletedUser);
				if (deletedUser) {
					return res.status(STATUS_CODE.OK).json({
						data: deletedUser,
						msg: `User with id: ${deletedUser.id} was deleted successfully.`,
					});
				} else {
					return res.status(STATUS_CODE.BAD_REQUEST).json('failed to delete User with id :' + ID);
				}
			} catch (error) {
				if (error instanceof Prisma.PrismaClientKnownRequestError) {
					console.log('🚀 ~ file: [id].tsx:74 ~ handler ~ error.code:', typeof error.code);
					if (error.code === 'P2003') {
						return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ msg: 'guardian has related orphans', error: error });
					}
				}
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ msg: 'something went wrong', error: error });
			}
		}
		//* ************************GET************************
		// case REQUEST_METHODS.GET: {
		// 	console.log('getting orphan info');

		// 	try {
		// 		const requiredGoal = await prisma.goal.findUnique({
		// 			where: {
		// 				id: ID,
		// 			},
		// 			include: {
		// 				GoalEvaluation: true,
		// 				ActivityGoal: { include: { ActivityInfo: { select: { id: true, title: true } } } },
		// 				User: true,
		// 				_count: true,
		// 			},
		// 		});
		// 		if (requiredGoal) return res.end(res.status(STATUS_CODE.OK).json({ data: requiredGoal, msg: 'Goal Founded' }));

		// 		return res.status(STATUS_CODE.BAD_REQUEST).json(`required Goal with id: ${ID} was not found.`);
		// 	} catch (error) {
		// 		return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json('Some thing went wrong :' + error);
		// 	}
		// }
	}
}
