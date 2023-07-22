import { User as U, UserType } from '@prisma/client';
import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';
/**
 * For extend default nextAuth User and Session Types with existing User type
 */
declare module 'next-auth' {
	//* interface DefaultSession {
	// 	user?: {
	// 		name?: string | null;
	// 		email?: string | null;
	// 		image?: string | null;
	// 	};
	// 	expires: ISODateString;
	// }
	//*  interface DefaultUser {
	// 			id: string;
	// 			name?: string | null;
	// 			email?: string | null;
	// 			image?: string | null;
	// 		}

	interface User extends DefaultUser {
		id: number;
		name: string;
		username: string;
		password: string;
		type: UserType;
	}
	interface Session extends DefaultSession {
		user: User;
	}
}

//  * export interface DefaultJWT extends Record<string, unknown> {
//   name?: string | null
//   email?: string | null
//   picture?: string | null
//   sub?: string
// }

declare module 'next-auth/jwt' {
	interface JWT extends DefaultJWT {
		id: number;
		name: string;
		username: string;
		// password: string;
		type: UserType;
	}
}
