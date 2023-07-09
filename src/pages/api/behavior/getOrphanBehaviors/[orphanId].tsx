import { NextApiRequest, NextApiResponse } from 'next';
import { REQUEST_METHODS, STATUS_CODE } from '../../../../../types';
import prisma from '../../../../../lib/prisma';
import SuperJSON from 'superjson';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const ID = Number(req.query.orphanId);
	console.log('🚀 ~ file: [id].tsx:9 ~ handler ~ ID:', ID);
	if (!ID) return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'orphan dose not exist.' });
	switch (req.method) {
		//* ************************GET************************
		case REQUEST_METHODS.GET: {
			console.log('getting orphan behavior info');

			try {
				const requiredBehavior = await getOrphanBehaviors(ID);
				if (requiredBehavior) {
					const data = SuperJSON.stringify(requiredBehavior);
					return res.status(STATUS_CODE.OK).json({ data: data, msg: `Behaviors of orphan with id:${ID} was Founded` });
				}
				return res.status(STATUS_CODE.BAD_REQUEST).json(`Orphan Behaviors with id:${ID} was not founded `);
			} catch (error) {
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json('Some thing went wrong :' + error);
			}
		}
	}
}
async function getOrphanBehaviors(id: number) {
	const requiredBehavior = await prisma.behaviorInfo.findMany({
		where: { orphanId: id },
		include: { User: true, BehaviorCriteria: { include: { Criteria: true } } },
		orderBy: { id: 'asc' },
	});
	return requiredBehavior.length != 0 ? requiredBehavior : undefined;
}
