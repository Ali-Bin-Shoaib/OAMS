import type { NextApiRequest, NextApiResponse } from 'next';
import { STATUS_CODE } from '../../../../types/types';
import formidable from 'formidable';
// export const config = { api: { bodyParser: false } };

// 	const options: formidable.Options = {};
// 	if (saveLocally) {
// 		options.uploadDir = path.join(process.cwd(), 'public/images');
// 		options.filename = (name, ext, path, form) => {
// 			return Date.now().toString() + '_' + path.originalFilename;
// 		};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		// const form = formidable();

		// form.parse(req, (err, fields, files) => {
		// 	console.log('🚀 ~ file: test.tsx:40 ~ form.parse ~ files:', typeof files.image);
		// 	if (err) res.json(err);

		// 	res.status(STATUS_CODE.OK).json({ files: files });
		// });
		const image = req.body;
		// console.log('🚀 ~ file: test.tsx:24 ~ handler ~ image:', image);
		res.status(STATUS_CODE.OK).json({ files: image });
	} catch (error) {
		console.log('🚀 ~ file: test.tsx:27 ~ handler ~ error:', error);
		res.status(STATUS_CODE.BAD_REQUEST).json(error);
	}
}
