// CONNECT  DELETE  GET HEAD  OPTIONS PATCH POST  PUT TRACE
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import {
	STATUS_CODE,
	REQUEST_METHODS,
	ORPHAN,
} from '../../../../types/types';
import { Orphan } from '@prisma/client';

// *make it run then make it pretty.
//TODO fix form to accept all orphan info "ALL"

// export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		if (req.method === REQUEST_METHODS.POST) {
			const data: ORPHAN = await req.body;
			const orphan: Orphan = JSON.parse(JSON.stringify(data));

			console.log('🚀 ~ file: create.tsx:27 ~ data.image:', data.image?.name);
			orphan.image = data.image?.name as string;
			console.log('🚀 ~ file: create.tsx:21 ~ orphan:', orphan);
			const newOrphan = await prisma.orphan.create({ data: orphan });
			console.log(
				'🚀 ~ file: create.tsx:24 ~ handler ~ newOrphan:',
				newOrphan
			);

			res.status(STATUS_CODE.Success).json(newOrphan);
		}
	} catch (error) {
		console.log('🚀 ~ file: create.tsx:29 ~ handler ~ error:', error);
		res.status(STATUS_CODE.BadRequest).json(error);
	}
}
