// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// CONNECT  DELETE  GET HEAD  OPTIONS PATCH POST  PUT TRACE
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { ORPHAN } from '../../../types/types';

// *make it run then make it pretty.
//TODO create models for each entity "start with orphan"
//TODO implement CRUD operation on models "start with orphan"
//TODO create UI for each operation
//TODO implement Login
//TODO after creating models and implement CRUD operations on them. validate these operation and fix bugs.
//TODO style after implementing operations successfully.or style after finishing the project.

type Data = {
	name: String;
	gender: Boolean;
	isMotherWorks: Boolean;
	birthplace: String;
	motherName: String;
	currentAddress: String;
	motherJob: String;
	liveWith: String;
	birthdate: Date;
	fatherDeathDate: Date;
	joinDate: Date;
	evaluation: Number;
};
enum StatusCodes {
	NotFound = 404,
	Success = 200,
	Accepted = 202,
	BadRequest = 400,
}

// export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method === 'GET') {
			const orphans = await prisma.orphan.findMany();

			res.status(StatusCodes.Success).json(orphans);
		} else if (req.method === 'POST') {
			const data = await req.body;
			// DB need type Date to store birthdate
			data.birthdate = new Date(data.birthdate);

			const newUser = await prisma.orphan.create({ data });
			console.log('🚀 ---------------------------------------------------🚀');
			console.log('🚀 ~ file: hello.ts:18 ~ handler ~ newUser:', newUser);
			console.log('🚀 ---------------------------------------------------🚀');

			res.status(StatusCodes.Success).json(newUser);
		}
		// else if (req.method === 'PUT') {
		//   res.status(StatusCodes.Success).json({ name: 'PUT', email: 'PUT' });
		// } else if (req.method === 'PATCH') {
		//   res.status(StatusCodes.Success).json({ name: 'PATCH', email: 'PATCH' });
		// } else if (req.method === 'DELETE') {
		//   res.status(StatusCodes.Success).json({ name: 'DELETE', email: 'DELETE' });
		// }
	} catch (error) {
		console.log('🚀 -----------------------------------------------🚀');
		console.log('🚀 ~ file: hello.ts:30 ~ handler ~ error:', error);
		console.log('🚀 -----------------------------------------------🚀');
		res.status(StatusCodes.Success).json(error);
	}
}
