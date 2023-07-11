import { NextApiRequest, NextApiResponse } from 'next';
import { REQUEST_METHODS, STATUS_CODE } from '../../../../types';
import prisma from '../../../../lib/prisma';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'GET': {
			try {
				const healthInfo = prisma.healthInfo.findMany();
				return res.end(res.status(STATUS_CODE.OK).json({ data: healthInfo, message: 'get all health info' }));
			} catch (error) {
				console.log('🚀 ~ file: index.tsx:12 ~ handler ~ error:', error);
			}
			break;
		}
	}
}
