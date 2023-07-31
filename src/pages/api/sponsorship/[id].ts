import { NextApiRequest, NextApiResponse } from 'next';
import { _ActivityInfo, _Orphan, Behavior, Education, REQUEST_METHODS, STATUS_CODE } from '../../../../types';
import prisma from '../../../../lib/prisma';
import { Prisma, Sponsorship, UserType } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/next-auth-options';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);
	console.log('🚀 ~ file: [id].tsx:13 ~ handler ~ req:', req.url);
	console.log('🚀 ~ file: [id].tsx:12 ~ handler ~ session:', session);
	if (session && session.user.type === UserType.ADMIN) {
	} else return res.status(STATUS_CODE.METHOD_NOT_ALLOWED).json({ msg: 'action not allowed' });

	const ID = Number(req.query.id);
	console.log('🚀 ~ file: [id].tsx:9 ~ handler ~ ID:', ID);
	if (!ID) return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'Sponsorship info dose not exist.' });
	switch (req.method) {
		//* ************************UPDATE************************
		case REQUEST_METHODS.PUT: {
			try {
				const sponsorship: Sponsorship = req.body;
				console.log('🚀 ~ file: [id].tsx:16 ~ handler ~ data:', sponsorship);

				const { id, orphanId, sponsorId, userId, ...rest } = sponsorship;
				const updateSponsorship: Prisma.SponsorshipUpdateArgs = {
					data: {
						Orphan: { connect: { id: orphanId || undefined } },
						User: { connect: { id: session.user.id } },
						Sponsor: { connect: { userId: sponsorId || undefined } },
						...rest,
					},
					where: { id: id },
				};

				const updatedSponsorship = await prisma.sponsorship.update(updateSponsorship);
				console.log('🚀 ~ file: [id].tsx:52 ~ handler ~ updatedSponsorship:', updatedSponsorship);
				return res
					.status(STATUS_CODE.OK)
					.json({ data: updatedSponsorship, msg: `Sponsorship with id:${updatedSponsorship.id} was update successfully` });
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:60 ~ handler ~ error:', error);
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ data: error, msg: 'Something went wrong.' });
			}
		}
		//* ************************DELETE************************

		case REQUEST_METHODS.DELETE: {
			try {
				const deletedSponsorship = await prisma.sponsorship.delete({ where: { id: ID } });
				console.log('🚀 ~ file: [id].tsx:69 ~ handler ~ deletedSponsorship:', deletedSponsorship);
				if (deletedSponsorship) {
					console.log('++++++++++++++++++++ at TRUE');

					return res.status(STATUS_CODE.OK).json({
						data: deletedSponsorship,
						msg: `Sponsorship with id: ${deletedSponsorship.id}  was deleted successfully.`,
					});
				} else {
					console.log('++++++++++++++++++++++++++ at else');
					return res.status(STATUS_CODE.BAD_REQUEST).json(`failed to delete Sponsorship info with id : ${ID}`);
				}
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:81 ~ handler ~ error:', error);
				console.log('+++++++++++++++++++++++++++++++++++ at catch error');

				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ msg: 'Sponsorship dose not exist :', error: error });
			}
		}
		//* ************************GET************************
		case REQUEST_METHODS.GET: {
			console.log('getting sponsorship info');

			try {
				const requiredSponsorship = await prisma.sponsorship.findUnique({ where: { id: ID } });
				if (requiredSponsorship)
					return res.status(STATUS_CODE.OK).json({ data: requiredSponsorship, msg: 'Sponsorship Founded' });
				return res.status(STATUS_CODE.BAD_REQUEST).json(`Required Sponsorship not founded with id:${ID}`);
			} catch (error) {
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json('Some thing went wrong :' + error);
			}
		}
	}
}
