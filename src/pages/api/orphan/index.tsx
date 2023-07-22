import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { STATUS_CODE } from '../../../../types';

// CONNECT  DELETE  GET HEAD  OPTIONS PATCH POST  PUT TRACE

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method === 'GET') {
			const orphans = await prisma.orphan.findMany({
				include: {
					Guardian: { select: { user: { select: { id: true, name: true } } } },
					Sponsorship: {
						include: { Sponsor: { select: { user: { select: { id: true, name: true } } } } },
						where: { isActive: true },
					},
				},
				orderBy: { id: 'asc' },
			});

			res.status(STATUS_CODE.OK).json({ data: orphans, msg: `${orphans.length} was founded.` });
		}
	} catch (error) {
		res.json(error);
	}
}
