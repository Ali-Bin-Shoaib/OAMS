import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { STATUS_CODE } from '../../../../types';

// CONNECT  DELETE  GET HEAD  OPTIONS PATCH POST  PUT TRACE

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method === 'GET') {
			const orphans = await prisma.orphan.findMany();

			res.status(STATUS_CODE.OK).json(orphans);
		}
	} catch (error) {
		res.json(error);
	}
}
