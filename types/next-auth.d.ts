import { User as U, UserType } from '@prisma/client';
import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';
/**
 * For extend default nextAuth User and Session Types with existing User type
 */
declare module 'next-auth' {
	// export interface DefaultSession {
	// 	user?: {
	// 		name?: string | null;
	// 		email?: string | null;
	// 		image?: string | null;
	// 	};
	// 	expires: ISODateString;
	// }
	//   export interface DefaultUser {
	// 			id: string;
	// 			name?: string | null;
	// 			email?: string | null;
	// 			image?: string | null;
	// 		}

	interface Session {
		user: User & DefaultSession;
	}
	interface User extends DefaultUser {
		id: number;
		username: string;
		password: string;
		type: UserType;
	}
}
/**export interface DefaultJWT extends Record<string, unknown> {
  name?: string | null
  email?: string | null
  picture?: string | null
  sub?: string
} */

declare module 'next-auth/jwt' {
	interface JWT extends DefaultJWT {
		id: number;
		type: UserType;
		password: string;
	}
}
