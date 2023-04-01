import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

	try {
	const notes = await prisma.note.findMany({
		select: {
			title: true,
			id: true,
			content: true,
		},
	});
        res.status(200).json(notes);
	} catch (error) {
		console.log("🚀 ~ file: noteList.tsx:16 ~ error:", error);
		res.json({ message: 'something is wrong' });
	}
}
