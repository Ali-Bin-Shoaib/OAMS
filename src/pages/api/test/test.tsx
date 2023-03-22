// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    console.log('🚀 ------------------------------------------🚀');
    console.log('🚀 ~ file: hello.ts:9 ~ handler ~ res:', res);
    console.log('🚀 ------------------------------------------🚀');
    console.log('🚀 ------------------------------------------🚀');
    console.log('🚀 ~ file: hello.ts:9 ~ handler ~ req:', req);
    console.log('🚀 ------------------------------------------🚀');

    res.status(200).json({ name: 'test' });
}
