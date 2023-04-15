import { NextApiRequest, NextApiResponse } from 'next';
import { REQUEST_METHODS, STATUS_CODE } from '../../../../types/types';
import prisma from '../../../../lib/prisma';
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	//TODO implement delete, update, details functionality on orphan model.
	try {
		const orphanId = Number(req.query.id);
		console.log('🚀 ~ file: [id].tsx:8 ~ handler ~ orphanId:', orphanId);
		if (req.method == REQUEST_METHODS.DELETE) {
			const orphan = await prisma.orphan.delete({ where: { id: orphanId } });
			return res
				.status(STATUS_CODE.Success)
				.json({ orphan: orphan, msg: 'was deleted' });
		}
		return res
			.status(STATUS_CODE.BadRequest)
			.json('failed to delete orphan with id :' + orphanId);
	} catch (error) {
		console.log('🚀 ~ file: [id].tsx:15 ~ handler ~ error:', error);
		return res.status(STATUS_CODE.BadRequest).json('failed to delete');
	}
}
