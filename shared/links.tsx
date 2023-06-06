export const serverLink = 'http://localhost:3000/';

export const Paths = {
	links: [
		{ label: 'Home', link: '/' },
		{ label: 'Orphans', link: '/orphans' },
		{ label: 'Users', link: '/users' },
		{ label: 'Guardians', link: '/guardians' },
		{ label: 'Sponsors', link: '/sponsors' },
		{ label: 'Sponsorships', link: '/sponsorships' },
		{ label: 'Attendance', link: '/attendance' },
		{ label: 'Activities', link: '/activities' },
		{ label: 'Activity Execution', link: '/activities/execute' },
		// { label: 'Health Info', link: '/healthInfo' },
		// { label: 'Behavior Info', link: '/behaviorInfo' },
		// { label: 'Test', link: '/orphans/Test' },
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
	// HealthInfo: { label: 'Health Info', link: '/healthInfo/' },
	// BehaviorInfo: { label: 'Behavior Info', link: '/behaviorInfo/' },
};
