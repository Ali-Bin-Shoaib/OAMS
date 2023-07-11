import { NextApiRequest, NextApiResponse } from 'next';
import { _ActivityInfo, _Orphan, Behavior, Education, Health, REQUEST_METHODS, STATUS_CODE } from '../../../../types';
import prisma from '../../../../lib/prisma';
import { Prisma, UserType } from '@prisma/client';
import SuperJSON from 'superjson';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const admin = await prisma.user.findFirst({ where: { type: UserType.ADMIN } });
	const ID = Number(req.query.id);
	console.log('🚀 ~ file: [id].tsx:9 ~ handler ~ ID:', ID);
	if (!ID) return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'Health info dose not exist.' });
	switch (req.method) {
		//* ************************UPDATE************************
		case REQUEST_METHODS.PUT: {
			try {
				const data: Health = req.body;

				const { id, Orphan, User, orphanId, userId, ...rest } = data;
				const updateHealth: Prisma.HealthInfoUpdateArgs = {
					data: {
						...rest,
						Orphan: { connect: { id: orphanId } },
						User: { connect: { id: userId || admin.id } },
					},
					where: { id: id },
				};

				const updatedHealth = await prisma.healthInfo.update(updateHealth);
				console.log('🚀 ~ file: [id].tsx:28 ~ handler ~ updatedHealth:', updatedHealth);
				return res
					.status(STATUS_CODE.OK)
					.json({ data: updatedHealth, msg: `Health with id:${updatedHealth.id} was update successfully` });
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:31 ~ handler ~ error:', error);
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ data: error, msg: 'Something went wrong.' });
			}
		}
		//* ************************DELETE************************

		case REQUEST_METHODS.DELETE: {
			try {
				const deletedHealth = await prisma.healthInfo.delete({ where: { id: ID } });
				console.log('🚀 ~ file: [id].tsx:42 ~ handler ~ deletedHealth:', deletedHealth);
				if (deletedHealth) {
					console.log('++++++++++++++++++++ at TRUE');

					return res.status(STATUS_CODE.OK).json({
						data: deletedHealth,
						msg: `Health info with id: ${deletedHealth.id}  was deleted successfully.`,
					});
				} else {
					console.log('++++++++++++++++++++++++++ at else');
					return res.status(STATUS_CODE.BAD_REQUEST).json(`failed to delete Health info with id : ${ID}`);
				}
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:81 ~ handler ~ error:', error);
				console.log('+++++++++++++++++++++++++++++++++++ at catch error');

				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ msg: 'Health info dose not exist :', error: error });
			}
		}
		//* ************************GET************************
		case REQUEST_METHODS.GET: {
			console.log("🚀 ~ file: [id].tsx:64 ~ handler ~ 'getting Health info':");

			try {
				const requiredHealth = await prisma.healthInfo.findMany({ where: { orphanId: ID }, include: { User: true } });
				const data = SuperJSON.stringify(requiredHealth);
				console.log('🚀 ~ file: [id].tsx:67 ~ handler ~ requiredHealth:', requiredHealth);
				if (requiredHealth.length != 0) return res.status(STATUS_CODE.OK).json({ data: data, msg: 'Health info Founded' });
				return res.status(STATUS_CODE.BAD_REQUEST).json(`Required Health info not founded with id:${ID}`);
			} catch (error) {
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json('Some thing went wrong :' + error);
			}
		}
	}
}
