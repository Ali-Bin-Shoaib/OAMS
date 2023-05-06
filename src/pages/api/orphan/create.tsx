// CONNECT  DELETE  GET HEAD  OPTIONS PATCH POST  PUT TRACE
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { STATUS_CODE, REQUEST_METHODS, _Orphan } from '../../../../types/types';
import { Orphan, Prisma } from '@prisma/client';
import formidable from 'formidable';
import nextConnect from 'next-connect';
// export const config = { api: { bodyParser: false } };
export const config = {
	api: {
		bodyParser: {
			sizeLimit: '10mb',
		},
	},
};

// *make it run then make it pretty.

// export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// const form = formidable();

	try {
		if (req.method === REQUEST_METHODS.POST) {
			// form.parse(req, async (err, fields, files) => {
			// if (!err) {
			// console.log('🚀 ~ file: create.tsx:18 ~ form.parse ~ files:', files);
			// console.log('🚀 ~ file: create.tsx:18 ~ form.parse ~ fields:', fields);

			const orphan: Orphan = req.body;
			console.log('🚀 ~ file: create.tsx:25 ~ //form.parse ~ orphan:', orphan.age);
			return res.end(200);
			// const newOrphan = await prisma.orphan.create({ data: orphan });
			// console.log('🚀 ~ file: create.tsx:20 ~ handler ~ newOrphan:', newOrphan);
			// return res.end(res.status(STATUS_CODE.Success).json({ data: newOrphan }));
			// }
			// console.log('🚀 ~ file: create.tsx:22 ~ form.parse ~ err:');
			// return res.json(err);
			// });
		}
	} catch (error) {
		console.log('🚀 ~ file: create.tsx:29 ~ handler ~ error:');
		// return res.status(STATUS_CODE.BadRequest).json(error);
		return res.end(res.status(STATUS_CODE.BadRequest).json(error));
	}
}
