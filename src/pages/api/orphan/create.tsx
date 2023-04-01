// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// CONNECT  DELETE  GET HEAD  OPTIONS PATCH POST  PUT TRACE
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import {STATUS_CODE, REQUEST_METHODS } from '../../../../types/types';
import { Orphan } from '@prisma/client';

// *make it run then make it pretty.
//TODO fix form to accept all orphan info "ALL"


// export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method === REQUEST_METHODS.POST) {
			const orphan:Orphan = await req.body;
			// DB need type Date to store birthdate
			orphan.birthdate = new Date(orphan.birthdate);
			orphan.fatherDeathDate = new Date(orphan.fatherDeathDate);
			
			// if(orphan.isMotherWorks=='true')
			// orphan.isMotherWorks=true;
			// else orphan.isMotherWorks=false;

			const newOrphan = await prisma.orphan.create({data: orphan });
			console.log("🚀 ~ file: create.tsx:31 ~ newOrphan:", newOrphan);

			res.status(STATUS_CODE.Success).json(newOrphan);
		}
	} catch (error) {
		console.log("🚀 ~ file: create.tsx:26 ~ handler ~ error:", error);
		res.status(STATUS_CODE.BadRequest).json(error);
	}
}
