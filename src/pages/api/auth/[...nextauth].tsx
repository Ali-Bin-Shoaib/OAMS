import NextAuth, { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../../lib/prisma';

export const authOptions: NextAuthOptions = {
	session: { strategy: 'jwt' },
	pages: {
		signIn: '/login',
		error: '/loginError',
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
				const user = findUser({ ...credentials });

				if (user) return user;
				return null;
			},
		}),
	],
	callbacks: {
		async session({ session, token }) {
			console.log('🚀 ~ file: [...nextauth].tsx:37 ~ session ~ session:', session);
			console.log('🚀 ~ file: [...nextauth].tsx:37 ~ session ~ token:', token);
			if (session?.user) session.user.type = token.type;
			return session;
		},
		async jwt({ session, token, user }) {
			const dbUser = findUser({ ...user, id: user.id as number });
			if (!dbUser) {
				if (user) {
					token.id = user.id as number;
					token.type = user.type;
				}
			}
			return token;
		},
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
	const user: User = await prisma.user.findFirst({
		where: { ...props },
		select: { id: true, name: true, type: true, password: true, username: true },
	});
	return user ? user : undefined;
};
