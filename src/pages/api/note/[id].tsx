import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const id = req.query.id;
	console.log('🚀 ~ file: [id].tsx:6 ~ id:', id);

	if (req.method === 'DELETE') {
		console.log('🚀 ~ file: [id].tsx:9 ~ req.method:', req.method);
		try {
			const note=await prisma.note.delete({ where: { id: Number(id) } });
			res.json({note:note,message:'was deleted'});
		} catch (error) {
			console.log('🚀 ~ file: [id].tsx:12 ~ error:', error);

			res.json({ message: 'something is wrong' });
		}
	}else{
        console.log('note could not be deleted');
        
    }
}
