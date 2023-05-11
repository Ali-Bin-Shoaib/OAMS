import { NextApiRequest, NextApiResponse } from 'next';
import { REQUEST_METHODS, STATUS_CODE } from '../../../../types/types';
import prisma from '../../../../lib/prisma';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'GET': {
			try {
				const guardians = prisma.guardian.findMany();
				console.log('🚀 ~ file: index.tsx:9 ~ handler ~ guardians:', guardians);
				return res.end(res.status(STATUS_CODE.Success).json({ data: guardians, message: 'get all guardians' }));
			} catch (error) {
				console.log('🚀 ~ file: index.tsx:14 ~ handler ~ error:SOMETHING WENT WRONG', error);
			}
			break;
		}
	}
}
