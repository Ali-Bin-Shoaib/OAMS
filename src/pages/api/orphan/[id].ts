import { NextApiRequest, NextApiResponse } from 'next';
import { _Orphan, REQUEST_METHODS, STATUS_CODE } from '../../../../types';
import prisma from '../../../../lib/prisma';
import { Guardian, Orphan, User } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/next-auth-options';
// export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);
	console.log('🚀 ~ file: [id].tsx:13 ~ handler ~ req:', req.url);
	console.log('🚀 ~ file: [id].tsx:12 ~ handler ~ session:', session);
	if (!session || session.user.type !== 'ADMIN') {
		return res.status(STATUS_CODE.METHOD_NOT_ALLOWED).json({ msg: 'action not allowed' });
	}

	const orphanId = Number(req.query.id);
	console.log('🚀 ~ file: [id].tsx:8 ~ handler ~ orphanId:', orphanId);
	if (orphanId < 0) return res.status(STATUS_CODE.BAD_REQUEST).json('orphan dose not exist.');

	switch (req.method) {
		//* ************************UPDATE************************

		case REQUEST_METHODS.PUT: {
			try {
				const data = req.body;
				console.log('🚀 ~ file: [id].tsx:20 ~ handler ~ data:', data);

				const orphan: Orphan & { Guardian: Guardian & { User: User } } = data;
				orphan.image = null;
				orphan.noOfFamilyMembers = orphan.males && orphan.females ? orphan.males + orphan.females : null;
				const { Guardian, id, ...rest } = orphan;
				const updatedOrphan = await prisma.orphan.update({ where: { id: orphanId }, data: rest });
				console.log('🚀 ~ file: [id].tsx:25 ~ handler ~ updatedOrphan:', updatedOrphan);
				return res.status(STATUS_CODE.OK).json({ data: orphan, msg: 'update success' });
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:26 ~ handler ~ error:', error);
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ data: error, msg: 'Something went wrong.' });
			}
		}

		//* ************************DELETE************************

		case REQUEST_METHODS.DELETE: {
			try {
				const orphan = await prisma.orphan.delete({ where: { id: orphanId } });
				if (orphan) return res.status(STATUS_CODE.OK).json({ data: orphan, msg: 'Deleted Successfully' });
				return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: `orphan with id : ${orphanId} dose not exist.` });
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:30 ~ handler ~ error:', error);
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ msg: 'Some thing went wrong.', error: error });
			}
		}
		//* ************************GET************************
		case REQUEST_METHODS.GET: {
			console.log('getting orphan info');

			try {
				const orphan = await prisma.orphan.findUnique({ where: { id: orphanId } });
				if (orphan) return res.status(STATUS_CODE.OK).json({ orphan: orphan, msg: 'Orphan Founded' });
				return res.status(STATUS_CODE.BAD_REQUEST).json('Orphan not founded with id:' + orphanId);
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:30 ~ handler ~ error:', error);
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json('Some thing went wrong :' + error);
			}
		}
	}
}
