import prisma from 'lib/prisma';
import { NextApiRequest } from 'next';
import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
	session: { strategy: 'jwt' },
	pages: {
		signIn: '/auth/login',
		// error: '/auth/login', // Displays signin buttons
		// signOut: '/auth/signout', // Displays form with sign out button
		// error: '/auth/error', // Error code passed in query string as ?error=
		// verifyRequest: '/auth/verify-request', // Used for check email page
		// newUser: null // If set, new users will be directed here on first sign in
	},
	debug: process.env.NODE_ENV !== 'production',

	providers: [
		CredentialsProvider({
			type: 'credentials',
			credentials: {},
			async authorize(credentials: CredentialsProps, req) {
				if (!credentials?.username || !credentials?.password) throw new Error('No username or password was provided');
				const user = await findUserByUsernameAndPassword({
					username: credentials?.username,
					password: credentials?.password,
				});
				if (!user) throw new Error('Invalid Username or Password');
				if (user.password !== credentials?.password) throw new Error('Invalid Username or Password');
				if (user.username !== credentials?.username) throw new Error('Invalid Username or Password');
				return user;
			},
		}),
	],
	callbacks: {
		/**
		 * When using JWT the jwt() callback is invoked before the session() callback,
		 * anything added to JWT will be immediately available in the session callback,
		 */
		async jwt({ token, user, trigger }) {
			// console.log('🚀 ~ file: next-auth-options.ts:42 ~ jwt ~ token:', token);
			// console.log('🚀 ~ file: next-auth-options.ts:42 ~ jwt ~ user:', user);
			if (user) {
				token.id = user.id as number;
				token.username = user.username;
				token.type = user.type;
			}
			// console.log('🚀 ~ file: next-auth-options.ts:46 ~ jwt ~ token:', token);
			return token;
		},
		// Send properties to the client, like an access_token and user id from a provider.
		async session({ session, token }) {
			// console.log('🚀 ~ file: next-auth-options.ts:54 ~ session ~ session:', session);
			// console.log('🚀 ~ file: next-auth-options.ts:53 ~ session ~ token:', token);
			//   if (session.user) {

			if (token) {
				session.user.id = token.id;
				session.user.username = token.username;
				session.user.type = token.type;
			}
			// console.log('🚀 ~ file: next-auth-options.ts:56 ~ session ~ session:', session);
			return session;
		},
		// async signIn({ user, credentials }) {
		// 	console.log('🚀 ~ file: next-auth-options.ts:66 ~ signIn ~ credentials:', credentials);
		// 	// Return false to display a default error message
		// 	if (!credentials) return false;
		// 	if (!credentials.username || !credentials.password) return false;
		// 	if (!user) return false;
		// 	// Or you can return a URL to redirect to:
		// 	// return '/unauthorized'
		// 	return true;
		// },
		// async redirect({ baseUrl, url }) {
		// 	console.log('🚀 ~ file: next-auth-options.ts:85 ~ redirect ~ url:', url);
		// 	if (url.startsWith('/')) return `${baseUrl}${url}`;
		// 	// Allows callback URLs on the same origin
		// 	else if (new URL(url).origin === baseUrl) return url;
		// 	return baseUrl;
		// },
	},
	// events: {
	// 	async signIn(message) {
	// 		console.log('🚀 ~ file: next-auth-options.ts:85 ~ signIn ~ message:', message);
	// 	},
	// 	async signOut(message) {
	// 		console.log('🚀 ~ file: next-auth-options.ts:88 ~ signOut ~ message:', message);
	// 	},
	// 	async session(message) {
	// 		console.log('🚀 ~ file: next-auth-options.ts:91 ~ session ~ message:', message);
	// 	},
	// },
};

interface CredentialsProps {
	username: string;
	password: string;
}

export const findUserByUsernameAndPassword = async ({ username, password }: CredentialsProps): Promise<User | null> => {
	if (!(username && password)) return null;
	try {
		const user: User | null = await prisma.user.findFirstOrThrow({
			where: { username, password },
			select: { id: true, name: true, type: true, password: true, username: true },
		});
		if (!user) return null;
		if (user.username !== username || user.password !== password) return null;
		return user;
	} catch (error) {
		console.log('🚀 ~ file: next-auth-options.ts:116 ~ findUserByUsernameAndPassword ~ error:', error);
		return null;
	}
};
