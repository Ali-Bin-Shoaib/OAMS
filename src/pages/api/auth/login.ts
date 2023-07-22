import prisma from 'lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { STATUS_CODE } from 'types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const data = req.body;
	console.log('🚀 ~ file: login.ts:7 ~ handler ~ data:', data.username);
	if (!data) return res.status(STATUS_CODE.BAD_REQUEST).json('no data was sent');
	const user = await prisma.user.findFirst({ where: { username: data.username, password: data.password } });

    return res.status(STATUS_CODE.OK).json({data:user});
}
