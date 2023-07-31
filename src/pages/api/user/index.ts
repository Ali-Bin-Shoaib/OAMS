import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { STATUS_CODE } from '../../../../types';

// CONNECT  DELETE  GET HEAD  OPTIONS PATCH POST  PUT TRACE

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method === 'GET') {
			const users = await prisma.user.findMany();

			res.status(STATUS_CODE.OK).json(users);
		}
	} catch (error) {
		res.json(error);
	}
}
