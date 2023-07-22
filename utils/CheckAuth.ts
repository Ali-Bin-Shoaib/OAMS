import { UserType } from '@prisma/client';
import { config } from 'src/middleware';
import { REQUEST_METHODS } from 'types';

export function isUserAuthorized(userType: UserType, path: string): boolean {
	console.log('🚀 ~ file: checkAuth.ts:5 ~ isAuthorized ~ userType:', userType);
	console.log('🚀 ~ file: checkAuth.ts:5 ~ isAuthorized ~ path:', path);
	switch (userType) {
		case UserType.ADMIN: {
			return true;
		}
		case UserType.ACTIVITY_SUPERVISOR: {
			if (path.startsWith('/activities') || path.startsWith('/goals') || path.startsWith('/dashboard')) return true;
			console.log('````````````````ACCESS DENIED!!````````````````');

			break;
		}
		case UserType.BEHAVIOR_SUPERVISOR: {
			if (path.startsWith('/behavior') || path.startsWith('/criteria') || path.startsWith('/dashboard')) return true;
			console.log('````````````````ACCESS DENIED!!````````````````');

			break;
		}
		case UserType.EDUCATION_SUPERVISOR: {
			if (path.startsWith('/education') || path.startsWith('/dashboard')) return true;
			console.log('````````````````ACCESS DENIED!!````````````````');

			break;
		}
		case UserType.GUARDIAN: {
			if (path.startsWith('/orphans') || path.startsWith('/activities')) return true;
			console.log('````````````````ACCESS DENIED!!````````````````');

			break;
		}
		case UserType.HEALTH_SUPERVISOR: {
			if (path.startsWith('/health') || path.startsWith('/dashboard')) return true;
			console.log('````````````````ACCESS DENIED!!````````````````');

			break;
		}
		case UserType.ORPHANAGE_SUPERVISOR: {
			if (path.startsWith('/attendance') || path.startsWith('/dashboard')) {
				return true;
			}

			console.log('````````````````ACCESS DENIED!!````````````````');

			break;
		}
		case UserType.SPONSOR: {
			if (
				path.startsWith('/orphans') ||
				path.startsWith('/activities') ||
				path.startsWith('/attendance') ||
				path.startsWith('/behavior') ||
				path.startsWith('/education') ||
				path.startsWith('/health')
			)
				return true;
			console.log('````````````````ACCESS DENIED!!````````````````');

			break;
		}
	}
	return false;
}
export function isActionAuthorized(userType: UserType, path: string, method: string): boolean {
	console.log('🚀 ~ file: checkAuth.ts:69 ~ isActionAuthorized ~ path:', path);
	console.log('🚀 ~ file: checkAuth.ts:69 ~ isActionAuthorized ~ method:', method);
	console.log('🚀 ~ file: checkAuth.ts:69 ~ isActionAuthorized ~ userType:', userType);
	switch (userType) {
		case UserType.ADMIN: {
			return true;
		}
		case UserType.ACTIVITY_SUPERVISOR: {
			if (path.startsWith('/api/activity') || path.startsWith('/api/goal')) return true;
			if (path.startsWith('/api/orphan') && method === REQUEST_METHODS.GET) return true;
			console.log('````````````````ACTION DENIED!!````````````````');
			return false;

			break;
		}
		case UserType.BEHAVIOR_SUPERVISOR: {
			if (path.startsWith('/api/behavior') || path.startsWith('/api/criteria')) return true;
			if (path.startsWith('/api/orphan') && method === REQUEST_METHODS.GET) return true;
			console.log('````````````````ACTION DENIED!!````````````````');
			return false;

			break;
		}
		case UserType.EDUCATION_SUPERVISOR: {
			if (path.startsWith('/api/education')) return true;
			if (path.startsWith('/api/orphan') && method === REQUEST_METHODS.GET) return true;
			console.log('````````````````ACTION DENIED!!````````````````');

			break;
		}
		case UserType.GUARDIAN: {
			// if (
			// 	path.startsWith('/api/contact') ||
			// 	path.startsWith('/api/criteria') ||
			// 	path.startsWith('/api/goal') ||
			// 	path.startsWith('/api/guardian') ||
			// 	path.startsWith('/api/room') ||
			// 	path.startsWith('/api/sponsor') ||
			// 	path.startsWith('/api/user')
			// )

			if (method === REQUEST_METHODS.GET) return true;
			console.log('````````````````ACTION DENIED!!````````````````');

			break;
		}
		case UserType.HEALTH_SUPERVISOR: {
			if (path.startsWith('/api/health')) return true;
			if (path.startsWith('/api/orphan') && method === REQUEST_METHODS.GET) return true;
			console.log('````````````````ACTION DENIED!!````````````````');

			break;
		}
		case UserType.ORPHANAGE_SUPERVISOR: {
			if (path.startsWith('/api/attendance')) return true;
			console.log('````````````````ACTION DENIED!!````````````````');
			// if (path.startsWith('/api/orphan') && method === REQUEST_METHODS.GET) return true;
			break;
		}
		case UserType.SPONSOR: {
			if (path.startsWith('/api/sponsorship') && method === REQUEST_METHODS.GET) return true;
			if (path.startsWith('/api/orphan') && method === REQUEST_METHODS.GET) return true;
			console.log('````````````````ACTION DENIED!!````````````````');

			break;
		}
	}
	return false;
}
