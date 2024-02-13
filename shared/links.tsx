import { Url } from 'next/dist/shared/lib/router/router';

export const serverLink = 'http://localhost:3000/' as const;
export interface HeaderLinkProps {
	links: { link: Url; label: string; relatedLinks?: { link: Url; label: string }[] }[];
}
export const Paths: HeaderLinkProps = {
	links: [
		{ label: 'صفحة الإدارة', link: serverLink + 'dashboard' },
		{
			label: 'الأيتام',
			// link: serverLink + 'orphans',
			link: '',

			relatedLinks: [
				{ label: 'إدارة الأيتام', link: '/orphans' },
				{ label: 'الحضور', link: serverLink + 'attendance' },
				{ label: 'معلومات التعليم', link: serverLink + 'education' },
				{ label: 'معلومات الصحة', link: serverLink + 'health' },
				{ label: 'معلومات السلوك', link: serverLink + 'behavior' },
				{ label: 'المعايير', link: serverLink + 'criteria' },
				{ label: 'معلومات الاتصال', link: serverLink + 'contact' },
			],
		},
		{
			label: 'الأنشطة',
			// link: serverLink + 'activities',
			link: '',

			relatedLinks: [
				{ label: 'إدارة الأنشطة', link: serverLink + 'activities' },
				{ label: 'الأهداف', link: serverLink + 'goals' },
				{ label: 'الأنشطة المنفّذة', link: serverLink + 'activities/execute' },
			],
		},
		{ label: 'المستخدمين', link: serverLink + 'users' },
		{ label: 'الأوصياء', link: serverLink + 'guardians' },
		{ label: 'الكفلاء', link: serverLink + 'sponsors' },
		{ label: 'الكفالات', link: serverLink + 'sponsorships' },
		{
			label: 'التقارير',
			link: '',
			relatedLinks: [
				{ label: 'تقرير الحضور', link: serverLink + 'reports/attendance' },
				{ label: 'تقرير الأنشظة', link: serverLink + 'reports/activity' },
				{ label: 'تقرير الأيتام', link: serverLink + 'reports/orphan' },
				{ label: 'تقريرالكفلاء', link: serverLink + 'reports/sponsor' },
				// { label: 'Sponsorship Report', link: serverLink + 'reports/sponsorship' },
				{ label: 'تقرير عام', link: serverLink + 'reports/comprehensive' },
				{ label: 'تقرير سنوي', link: serverLink + 'reports/yearly' },
			],
		},
		// { label: 'Rooms', link: serverLink + 'rooms' },
	],
};

export const Pages = {
	Home: { label: 'الصفحة الرئيسية', link: serverLink },
	Orphans: { label: 'الأيتام', link: `${serverLink}orphans/` },
	Users: { label: 'المستخدمين', link: `${serverLink}users/` },
	Guardians: { label: 'الأوصياء', link: `${serverLink}guardians/` },
	Sponsors: { label: 'الكفلاء', link: `${serverLink}sponsors/` },
	Sponsorships: { label: 'الكفالات', link: `${serverLink}sponsorships/` },
	Attendance: { label: 'الحضور', link: `${serverLink}attendance/` },
	Activities: { label: 'الأنشظة', link: `${serverLink}activities/` },
	ActivityExecution: { label: 'الأنشظة المنفذة', link: `${serverLink}activities/execute/` },
	Goals: { label: 'الأهداف', link: `${serverLink}goals/` },
	HealthInfo: { label: 'المعلومات الصحية', link: `${serverLink}health/` },
	BehaviorInfo: { label: 'معلومات السلوك', link: `${serverLink}behavior/` },
	CriteriaInfo: { label: 'المعايير', link: `${serverLink}criteria/` },
	EmergenceContactInfo: { label: 'معلومات التواصل', link: `${serverLink}contact/` },
	EducationInfo: { label: 'المعلومات الدراسية', link: `${serverLink}education/` },
	// Rooms: { label: 'Reports', link: serverLink + 'reports/' },

	// HealthInfo: { label: 'Health Info', link: '/healthInfo/' },
	// BehaviorInfo: { label: 'Behavior Info', link: '/behaviorInfo/' },
} as const;
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
