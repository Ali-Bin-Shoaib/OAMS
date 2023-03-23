// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// CONNECT  DELETE  GET HEAD  OPTIONS PATCH POST  PUT TRACE
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

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
			res.status(StatusCodes.Success).json({ message: 'get method' });
		} else if (req.method === 'POST') {
			const data = await req.body;

			console.log('🚀 ---------------------------------------------🚀');
			console.log('🚀 ~ file: hello.ts:27 ~ handler ~ data:', data);
			console.log('🚀 ---------------------------------------------🚀');

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
