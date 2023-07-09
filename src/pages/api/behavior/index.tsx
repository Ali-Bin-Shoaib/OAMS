import { NextApiRequest, NextApiResponse } from 'next';
import { REQUEST_METHODS, STATUS_CODE } from '../../../../types';
import prisma from '../../../../lib/prisma';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case REQUEST_METHODS.GET: {
			try {
				const behaviors = prisma.behaviorInfo.findMany({ include: { User: true } });
				if (behaviors) return res.end(res.status(STATUS_CODE.OK).json({ data: behaviors, message: 'get all behaviors' }));
			} catch (error) {
				console.log('🚀 ~ file: index.tsx:12 ~ handler ~ error:', error);
			}
			break;
		}
	}
}
