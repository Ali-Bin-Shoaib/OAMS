// CONNECT  DELETE  GET HEAD  OPTIONS PATCH POST  PUT TRACE
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { STATUS_CODE, REQUEST_METHODS, _Orphan } from '../../../../types';
import { Orphan, Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/next-auth-options';
// import formidable from 'formidable';
// import nextConnect from 'next-connect';
// export const config = { api: { bodyParser: false } };

// *make it run then make it pretty.

// export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	console.log('🚀 ~ file: create.tsx:14 ~ handler ~ req:', req.method);
	// const form = formidable();
	try {
		const session = await getServerSession(req, res, authOptions);
		if (!session) res.status(STATUS_CODE.UNAUTHORIZED).json({ msg: 'you must log in' });
		console.log('🚀 ~ file: create.tsx:19 ~ handler ~ session:', session);
		if (req.method === REQUEST_METHODS.POST) {
			const orphan: Orphan = req.body;
			orphan.image = null;
			orphan.noOfFamilyMembers = orphan.males + orphan.females;
			console.log('🚀 ~ file: create.tsx:25 ~ //form.parse ~ orphan:', orphan);
			const newOrphan = await prisma.orphan.create({ data: orphan });
			console.log('🚀 ~ file: create.tsx:20 ~ handler ~ newOrphan:', newOrphan);
			return res.end(res.status(STATUS_CODE.OK).json({ data: newOrphan }));
		}
		res.status(STATUS_CODE.METHOD_NOT_ALLOWED).json({ msg: 'Un Authorized Access' });
	} catch (error) {
		console.log('🚀 ~ file: create.tsx:29 ~ handler ~ error:', error);
		// return res.status(STATUS_CODE.BadRequest).json(error);
		return res.end(res.status(STATUS_CODE.BAD_REQUEST).json(error));
	}
}
