import { NextApiRequest, NextApiResponse } from 'next';
import { _Orphan, REQUEST_METHODS, STATUS_CODE } from '../../../../types/types';
import prisma from '../../../../lib/prisma';
import { Orphan } from '@prisma/client';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	//TODO implement , update, details functionality on orphan model.

	const orphanId = Number(req.query.id);
	console.log('🚀 ~ file: [id].tsx:8 ~ handler ~ orphanId:', orphanId);
	if (orphanId < 0) return res.status(STATUS_CODE.NotFound).json('orphan dose not exist.');

	switch (req.method) {
		//* ************************UPDATE************************
		case REQUEST_METHODS.PUT: {
			try {
				const data: Orphan = await req.body;
				const orphan: Orphan = JSON.parse(JSON.stringify(data));
				const image: File = orphan.image as unknown as File;
				console.log('🚀 ~ file: [id].tsx:19 ~ handler ~ image:', image.name);

				const updateOrphan = await prisma.orphan.update({ where: { id: orphanId }, data: orphan });
				console.log('🚀 ~ file: [id].tsx:19 ~ handler ~ updateOrphan:', updateOrphan);

				return res.status(STATUS_CODE.Success).json({ message: 'updated successfully', updateOrphan: updateOrphan });
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:26 ~ handler ~ error:', error);
				return res.status(STATUS_CODE.UnexpectedError).json('Something went wrong.');
			}
		}
		//* ************************DELETE************************

		case REQUEST_METHODS.DELETE: {
			try {
				const orphan = await prisma.orphan.delete({ where: { id: orphanId } });
				if (orphan) return res.status(STATUS_CODE.Success).json({ orphan: orphan, msg: 'Deleted Successfully' });
				return res.status(STATUS_CODE.BadRequest).json('failed to delete orphan with id :' + orphanId);
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:30 ~ handler ~ error:', error);
				return res.status(STATUS_CODE.UnexpectedError).json('Some thing went wrong :' + error);
			}
		}
		//* ************************GET************************
		case REQUEST_METHODS.GET: {
			console.log('getting orphan info');

			try {
				const orphan = await prisma.orphan.findUnique({ where: { id: orphanId } });
				if (orphan) return res.status(STATUS_CODE.Success).json({ orphan: orphan, msg: 'Orphan Founded' });
				return res.status(STATUS_CODE.BadRequest).json('Orphan not founded with id:' + orphanId);
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:30 ~ handler ~ error:', error);
				return res.status(STATUS_CODE.UnexpectedError).json('Some thing went wrong :' + error);
			}
		}
	}
}
