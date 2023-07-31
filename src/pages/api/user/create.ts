// CONNECT  DELETE  GET HEAD  OPTIONS PATCH POST  PUT TRACE
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { STATUS_CODE, REQUEST_METHODS, _User, _UserWithGuardianAndSponsor, _Sponsor } from '../../../../types';
import { Prisma, User } from '@prisma/client';
import * as argon from 'argon2';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/next-auth-options';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);
	console.log('🚀 ~ file: [id].tsx:13 ~ handler ~ req:', req.url);
	console.log('🚀 ~ file: [id].tsx:12 ~ handler ~ session:', session);
	if (!session || session.user.type !== 'ADMIN') {
		return res.status(STATUS_CODE.METHOD_NOT_ALLOWED).json({ msg: 'action not allowed' });
	}

	try {
		if (req.method === REQUEST_METHODS.POST) {
			const bigUser = req.body;
			console.log('🚀 ~ file: create.tsx:11 ~ handler ~ bigUser:', bigUser);
			const { Guardian, sponsor, ...user } = bigUser;
			console.log('🚀 ~ file: create.tsx:12 ~ handler ~ guardian:', Guardian);
			if (user.type === 'GUARDIAN') {
				const newGuardian = await prisma.user.create({
					data: { ...user, Guardian: { create: { relationship: Guardian?.relationship as string } } },
				});
				console.log('🚀 ~ file: create.tsx:16 ~ handler ~ newGuardian:', newGuardian);

				return res.end(res.status(STATUS_CODE.OK).json({ data: newGuardian, msg: 'create Guardian successfully' }));
			}
			if (user.type === 'SPONSOR') {
				const newSponsor = await prisma.user.create({
					data: { ...user, Sponsor: { create: sponsor } },
				});
				console.log('🚀 ~ file: create.tsx:25 ~ handler ~ newSponsor:', newSponsor);
				return res.end(res.status(STATUS_CODE.OK).json({ data: newSponsor, msg: 'create Sponsor successfully' }));
			}
			//* if user type not is guardian nor sponsor create model with provided type in user table only.
			const newUser = await prisma.user.create({ data: user });
			console.log('🚀 ~ file: create.tsx:29 ~ handler ~ newUser:', newUser);
			return res.end(res.status(STATUS_CODE.OK).json({ data: newUser, msg: 'create User successfully' }));
		}
	} catch (error) {
		console.log('🚀 ~ file: create.tsx:38 ~ handler ~ error:', error);
		return res.end(res.status(STATUS_CODE.BAD_REQUEST).json(error));
	}
}
