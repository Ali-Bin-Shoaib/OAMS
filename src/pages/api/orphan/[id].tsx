import { NextApiRequest, NextApiResponse } from 'next';
import { _Orphan, REQUEST_METHODS, STATUS_CODE } from '../../../../types/types';
import prisma from '../../../../lib/prisma';
import { Orphan } from '@prisma/client';
import SuperJSON from 'superjson';
import formidable from 'formidable';
// export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const orphanId = Number(req.query.id);
	console.log('🚀 ~ file: [id].tsx:8 ~ handler ~ orphanId:', orphanId);
	if (orphanId < 0) return res.status(STATUS_CODE.BAD_REQUEST).json('orphan dose not exist.');

	switch (req.method) {
		//* ************************UPDATE************************
		case REQUEST_METHODS.PUT: {
			try {
				// const form = formidable({ multiples: true });
				// form.parse(req, async (err, fields, files) => {
				// console.log('🚀 ~ file: [id].tsx:21 ~ form.parse ~ req:', req);
				// console.log('🚀 ~ file: create.tsx:18 ~ form.parse ~ files:', files);
				// console.log('🚀 ~ file: create.tsx:18 ~ form.parse ~ fields:', fields);
				// if (err) res.json(err);
				// const data: _Orphan = fields as unknown as _Orphan;
				// const orphan: Orphan = data as unknown as Orphan;
				const data = req.body;
				const orphan: Orphan = data;
				orphan.image = null;
				orphan.noOfFamilyMembers = orphan.males && orphan.females ? orphan.males + orphan.females : null;

				const updatedOrphan = await prisma.orphan.update({ where: { id: orphanId }, data: orphan });
				console.log("🚀 ~ file: [id].tsx:32 ~ //form.parse ~ updatedOrphan:", updatedOrphan);
				return res.status(STATUS_CODE.OK).json({ data: orphan, msg: 'update success' });
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:26 ~ handler ~ error:', error);
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ data: error, msg: 'Something went wrong.' });
			}
		}
		//* ************************DELETE************************

		case REQUEST_METHODS.DELETE: {
			try {
				const orphan = await prisma.orphan.delete({ where: { id: orphanId } });
				if (orphan) return res.status(STATUS_CODE.OK).json({ orphan: orphan, msg: 'Deleted Successfully' });
				return res.status(STATUS_CODE.BAD_REQUEST).json('failed to delete orphan with id :' + orphanId);
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:30 ~ handler ~ error:', error);
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json('Some thing went wrong :' + error);
			}
		}
		//* ************************GET************************
		case REQUEST_METHODS.GET: {
			console.log('getting orphan info');

			try {
				const orphan = await prisma.orphan.findUnique({ where: { id: orphanId } });
				if (orphan) return res.status(STATUS_CODE.OK).json({ orphan: orphan, msg: 'Orphan Founded' });
				return res.status(STATUS_CODE.BAD_REQUEST).json('Orphan not founded with id:' + orphanId);
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:30 ~ handler ~ error:', error);
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json('Some thing went wrong :' + error);
			}
		}
	}
}
