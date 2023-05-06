import type { NextApiRequest, NextApiResponse } from 'next';
import { STATUS_CODE } from '../../../../types/types';
import formidable from 'formidable';
export const config = { api: { bodyParser: false } };

// 	const options: formidable.Options = {};
// 	if (saveLocally) {
// 		options.uploadDir = path.join(process.cwd(), 'public/images');
// 		options.filename = (name, ext, path, form) => {
// 			return Date.now().toString() + '_' + path.originalFilename;
// 		};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const form = formidable();

		form.parse(req, (err, fields, files) => {
			console.log('🚀 ~ file: test.tsx:40 ~ form.parse ~ files:', typeof files.image);
			if (err) res.json(err);

			res.status(STATUS_CODE.Success).json({ files: files });
		});
	} catch (error) {
		res.status(STATUS_CODE.BadRequest).json(error);
	}
}
