// CONNECT  DELETE  GET HEAD  OPTIONS PATCH POST  PUT TRACE
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { STATUS_CODE, REQUEST_METHODS, _User, _BigUser, _Sponsor } from '../../../../types/types';
import { User, Prisma, Guardian, Sponsor } from '@prisma/client';
import formidable from 'formidable';
import nextConnect from 'next-connect';
// export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method === REQUEST_METHODS.POST) {
			const bigUser: _User = req.body;
			console.log('🚀 ~ file: create.tsx:14 ~ handler ~ bigUser:', bigUser.sponsor);
			// const { guardian: g, sponsor: s, ...user } = bigUser;
			const { guardian, sponsor, ...user } = bigUser;

			console.log('🚀 ~ file: create.tsx:15 ~ handler ~ guardian:', guardian);
			console.log('🚀 ~ file: create.tsx:15 ~ handler ~ sponsor:', sponsor);
			console.log('🚀 ~ file: create.tsx:15 ~ handler ~ user:', user);
			// const newUser = await prisma.user.create({ data: user });
			// console.log('🚀 ~ file: create.tsx:16 ~ handler ~ newUser:', newUser);

			// if (g && newUser) {
			if (guardian?.relationship) {
				const newGuardian = await prisma.user.create({ data: { ...user, Guardian: { create: guardian } } });
				console.log('🚀 ~ file: create.tsx:25 ~ handler ~ newGuardian:', newGuardian);
				return res.end(res.status(STATUS_CODE.Success).json({ data: newGuardian }));
			}
			// if (s && newUser) {
			if (sponsor) {
				console.log('🚀 ~ file: create.tsx:33 ~ handler ~ sponsor:', sponsor);
				// const newSponsor = await prisma.sponsor.create({ data: sponsor });
				const newSponsor = await prisma.user.create({
					//fix create sponsor
					data: { ...user, Sponsor: { create: sponsor } },
				});

				// include: { Sponsor: true }, // Include all posts in the returned object

				// const newSponsor = await prisma.user.create({ data: { ...user, Sponsor: { create: [sponsor] } } });
				console.log('🚀 ~ file: create.tsx:25 ~ handler ~ newSponsor:', newSponsor);
				return res.end(res.status(STATUS_CODE.Success).json({ data: newSponsor }));
			}
		}
	} catch (error) {
		console.log('🚀 ~ file: create.tsx:38 ~ handler ~ error:', error);
		return res.end(res.status(STATUS_CODE.BadRequest).json(error));
	}
}
