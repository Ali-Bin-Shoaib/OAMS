import { Url } from 'next/dist/shared/lib/router/router';

export const serverLink = 'http://localhost:3000/';
export interface HeaderLinkProps {
	links: { link: Url; label: string; relatedLinks?: { link: Url; label: string }[] }[];
}
export const Paths: HeaderLinkProps = {
	links: [
		{ label: 'Dashboard', link: serverLink + 'dashboard' },
		{
			label: 'Orphans',
			// link: serverLink + 'orphans',
			link: '',

			relatedLinks: [
				{ label: 'Manage Orphans', link: '/orphans' },
				{ label: 'Attendance', link: serverLink + 'attendance' },
				{ label: 'Education Info', link: serverLink + 'education' },
				{ label: 'Health Info', link: serverLink + 'health' },
				{ label: 'Behavior Info', link: serverLink + 'behavior' },
				{ label: 'Criteria', link: serverLink + 'criteria' },
				{ label: 'Emergence Contact Info', link: serverLink + 'contact' },
			],
		},
		{
			label: 'Activities',
			// link: serverLink + 'activities',
			link: '',

			relatedLinks: [
				{ label: 'Mange Activities', link: serverLink + 'activities' },
				{ label: 'Goals', link: serverLink + 'goals' },
				{ label: 'Activity Execution', link: serverLink + 'activities/execute' },
			],
		},
		{ label: 'Users', link: serverLink + 'users' },
		{ label: 'Guardians', link: serverLink + 'guardians' },
		{ label: 'Sponsors', link: serverLink + 'sponsors' },
		{ label: 'Sponsorships', link: serverLink + 'sponsorships' },
		{
			label: 'Reports',
			link: '',
			relatedLinks: [
				{ label: 'Attendance Report', link: serverLink + 'reports/attendance' },
				{ label: 'Activity Report', link: serverLink + 'reports/activity' },
				{ label: 'Orphan Report', link: serverLink + 'reports/orphan' },
				{ label: 'Sponsor Report', link: serverLink + 'reports/sponsor' },
				{ label: 'Comprehensive Report', link: serverLink + 'reports/comprehensive' },
				{ label: 'Yearly Report', link: serverLink + 'reports/yearly' },
			],
		},
		// { label: 'Rooms', link: serverLink + 'rooms' },
	],
};

export const Pages = {
	Home: { label: 'Home', link: serverLink },
	Orphans: { label: 'Orphans', link: serverLink + 'orphans/' },
	Users: { label: 'Users', link: serverLink + 'users/' },
	Guardians: { label: 'Guardians', link: serverLink + 'guardians/' },
	Sponsors: { label: 'Sponsors', link: serverLink + 'sponsors/' },
	Sponsorships: { label: 'Sponsorships', link: serverLink + 'sponsorships/' },
	Attendance: { label: 'Attendance', link: serverLink + 'attendance/' },
	Activities: { label: 'Activities', link: serverLink + 'activities/' },
	ActivityExecution: { label: 'Activity Execution', link: serverLink + 'activities/execute/' },
	Goals: { label: 'Goals', link: serverLink + 'goals/' },
	HealthInfo: { label: 'Health Info', link: serverLink + 'health/' },
	BehaviorInfo: { label: 'Behavior Info', link: serverLink + 'behavior/' },
	CriteriaInfo: { label: 'Criteria', link: serverLink + 'criteria/' },
	EmergenceContactInfo: { label: 'Emergence Contact Info', link: serverLink + 'contact/' },
	EducationInfo: { label: 'Education Info', link: serverLink + 'education/' },
	// Rooms: { label: 'Reports', link: serverLink + 'reports/' },

	// HealthInfo: { label: 'Health Info', link: '/healthInfo/' },
	// BehaviorInfo: { label: 'Behavior Info', link: '/behaviorInfo/' },
};
export const ProtectedRoutes = [
	'/activities/:path*',
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
	'/api/',
	'/reports/:path*',
];
export const PagesUrl = [
	'/dashboard',
	'/activities',
	'/attendance',
	'/behavior',
	'/contact',
	'/criteria',
	'/education',
	'/goals',
	'/guardians',
	'/health',
	'/rooms',
	'/sponsors',
	'/sponsorships',
	'/users',
	'/auth',
	'/api',
	'/reports',
];
