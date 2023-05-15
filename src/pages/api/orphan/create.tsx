// CONNECT  DELETE  GET HEAD  OPTIONS PATCH POST  PUT TRACE
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { STATUS_CODE, REQUEST_METHODS, _Orphan } from '../../../../types/types';
import { Orphan, Prisma } from '@prisma/client';
// import formidable from 'formidable';
// import nextConnect from 'next-connect';
// export const config = { api: { bodyParser: false } };

// *make it run then make it pretty.

// export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// const form = formidable();

	try {
		if (req.method === REQUEST_METHODS.POST) {
			const orphan: Orphan = req.body;
			orphan.image = null;
			console.log('🚀 ~ file: create.tsx:25 ~ //form.parse ~ orphan:', orphan);
			const newOrphan = await prisma.orphan.create({ data: orphan });
			console.log('🚀 ~ file: create.tsx:20 ~ handler ~ newOrphan:', newOrphan);
			return res.end(res.status(STATUS_CODE.OK).json({ data: newOrphan }));
		}
	} catch (error) {
		console.log('🚀 ~ file: create.tsx:29 ~ handler ~ error:', error);
		// return res.status(STATUS_CODE.BadRequest).json(error);
		return res.end(res.status(STATUS_CODE.BAD_REQUEST).json(error));
	}
}
