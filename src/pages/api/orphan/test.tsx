import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { STATUS_CODE } from '../../../../types/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const image = req.body as File;
		console.log('🚀 ~ file: Test.tsx:9 ~ handler ~ image:', image);

		res.status(STATUS_CODE.Success).json({ image: image, message: 'image' });
	} catch (error) {
		res.status(STATUS_CODE.BadRequest).json(error);
	}
}
