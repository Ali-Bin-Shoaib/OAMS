import NextAuth from 'next-auth';
import { authOptions } from './next-auth-options';
import type { NextApiRequest, NextApiResponse } from 'next';

// export default NextAuth(authOptions);
export default async function AuthenticationHandler(req: NextApiRequest, res: NextApiResponse) {

	return await NextAuth(req, res, authOptions);
}
