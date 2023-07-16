import NextAuth, { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../../lib/prisma';

export const authOptions: NextAuthOptions = {
	session: { strategy: 'jwt' },
	pages: {
		// signIn: '/login',
		// error: '/loginError',
		// signOut: '',
		// newUser: '',
		// verifyRequest: '',
	},
	providers: [
		CredentialsProvider({
			type: 'credentials',
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'Your Username' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				console.log('🚀 ~ file: [...nextauth].tsx:22 ~ authorize ~ credentials:', credentials);
				try {
					const user = await findUser({ username: credentials.username, password: credentials.password });
					console.log('🚀 ~ file: [...nextauth].tsx:24 ~ authorize ~ user:', user);
					if (user) return user;
				} catch (error) {
					throw new Error(`Error at findUser. Error:${error}`);
				}

				return null;
			},
		}),
	],
	callbacks: {
		// async session({ session, token }) {
		// 	console.log('🚀 ~ file: [...nextauth].tsx:37 ~ session ~ session:', session);
		// 	console.log('🚀 ~ file: [...nextauth].tsx:37 ~ session ~ token:', token);
		// 	if (session?.user) session.user.type = token.type;
		// 	return session;
		// },
		// async jwt({ session, token, user }) {
		// 	console.log('🚀 ~ file: [...nextauth].tsx:42 ~ jwt ~ session:', session);
		// 	console.log('🚀 ~ file: [...nextauth].tsx:38 ~ jwt ~ token:', token);
		// 	console.log('🚀 ~ file: [...nextauth].tsx:38 ~ jwt ~ user:', user);
		// 	const dbUser = await findUser({ ...user, id: user.id as number });
		// 	if (!dbUser) {
		// 		if (user) {
		// 			token.id = user.id as number;
		// 			token.type = user.type;
		// 		}
		// 	}
		// 	return token;
		// },
	},
};
export default NextAuth(authOptions);
interface FindUserProps {
	id?: number;
	name?: string;
	username: string;
	password: string;
}
const findUser = async ({ ...props }: FindUserProps): Promise<User | undefined> => {
	console.log('🚀 ~ file: [...nextauth].tsx:63 ~ findUser ~ props:', props);
	try {
		const user: User = await prisma.user.findFirst({
			where: { ...props },
			select: { id: true, name: true, type: true, password: true, username: true },
		});
		return user ? user : undefined;
	} catch (error) {
		throw new Error(`Error in finding user. Error: ${error}`);
	}
};
