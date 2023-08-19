// applies next auth to all pages by export the default from next-auth/middleware
// export { default } from 'next-auth/middleware';
import prisma from 'lib/prisma';
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { isActionAuthorized, isUserAuthorized } from 'utils/CheckAuth';

export default withAuth(
	// `withAuth` augments your `Request` with the user's token.
	async function middleware(req: NextRequestWithAuth) {
		const userType = req.nextauth.token?.type;
		// console.log('🚀 ~  userType:', userType);
		// console.log("🚀 ~  startsWith('/api'):", req.nextUrl.pathname.startsWith('/api'));
		console.log('🚀 isUserAuthorized', isUserAuthorized(userType!, req.nextUrl.pathname));
		if (userType) {
			if (!req.nextUrl.pathname.startsWith('/api'))
				if (!isUserAuthorized(userType, req.nextUrl.pathname)) {
					return NextResponse.rewrite(new URL('/auth/accessDenied', req.url));
				}
		}
	},
	{
		callbacks: {
			authorized: ({ token }) => {
				return !!token;
			},
		},
	}
);

export const config = {
	matcher: [
		'/dashboard',
		'/activities/:path*',
		'/orphans/:path*',
		'/attendance/:path*',
		'/behavior/:path*',
		'/contact/:path*',
		'/criteria/:path*',
		'/education/:path*',
		'/goals/:path*',
		'/guardians/:path*',
		'/health/:path*',
		'/rooms/:path*',
		'/sponsors/:path*',
		'/sponsorships/:path*',
		'/users/:path*',
		'/auth',
		'/api/:path*',
	],
};
