// CONNECT  DELETE  GET HEAD  OPTIONS PATCH POST  PUT TRACE
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { STATUS_CODE, REQUEST_METHODS, _Orphan } from '../../../../types/types';
import { Guardian } from '@prisma/client';
import formidable from 'formidable';
import nextConnect from 'next-connect';
// export const config = { api: { bodyParser: false } };

// *make it run then make it pretty.

// export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// const form = formidable();

	try {
		if (req.method === REQUEST_METHODS.POST) {
			const guardian: Guardian = req.body;
			const newGuardian = await prisma.orphan.create({ data: guardian });
			return res.end(res.status(STATUS_CODE.Success).json({ data: newGuardian }));
		}
	} catch (error) {
		return res.end(res.status(STATUS_CODE.BadRequest).json(error));
	}
}
