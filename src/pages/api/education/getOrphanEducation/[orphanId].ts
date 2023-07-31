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
			console.log('getting orphan Education info');

			try {
				const requiredEducation = await getOrphanEducation(ID);
				if (requiredEducation) {
					const data = SuperJSON.stringify(requiredEducation);
					return res.status(STATUS_CODE.OK).json({ data: data, msg: `Educations of orphan with id:${ID} was Founded` });
				}
				return res.status(STATUS_CODE.BAD_REQUEST).json(`Orphan with id:${ID} has no education info `);
			} catch (error) {
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ msg: 'Some thing went wrong :', error: error });
			}
		}
	}
}
async function getOrphanEducation(id: number) {
	const requiredEducation = await prisma.educationInfo.findMany({
		where: { orphanId: id },
		include: { User: true, Orphan: true },
		orderBy: { id: 'asc' },
	});
	console.log('🚀 ~ file: [orphanId].tsx:34 ~ getOrphanEducation ~ requiredEducation:', requiredEducation);
	return requiredEducation.length != 0 ? requiredEducation : undefined;
}
