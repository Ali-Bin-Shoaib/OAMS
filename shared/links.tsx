export const serverLink = 'http://localhost:3000/';
interface HeaderLinkProps {
	links: { link: string; label: string; relatedLinks?: { link: string; label: string }[] }[];
}
export const Paths: HeaderLinkProps = {
	links: [
		{
			label: 'Orphans',
			link: serverLink + 'orphans',
			relatedLinks: [
				// { label: 'Orphans', link: '/orphans' },
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
			link: serverLink + 'activities',
			relatedLinks: [
				{ label: 'Goals', link: serverLink + 'goals' },
				{ label: 'Activity Execution', link: serverLink + 'activities/execute' },
			],
		},
		{ label: 'Users', link: serverLink + 'users' },
		{ label: 'Guardians', link: serverLink + 'guardians' },
		{ label: 'Sponsors', link: serverLink + 'sponsors' },
		{ label: 'Sponsorships', link: serverLink + 'sponsorships' },
		{ label: 'Rooms', link: serverLink + 'rooms' },
	],
};
// export const Paths = {
// 	links: [
// 		{ label: 'Home', link: '/' },
// 		{ label: 'Users', link: '/users' },
// 		{ label: 'Guardians', link: '/guardians' },
// 		{ label: 'Sponsors', link: '/sponsors' },
// 		{ label: 'Sponsorships', link: '/sponsorships' },
// 		{ label: 'Rooms Info', link: '/rooms' },
// 		{ label: 'Activities', link: '/activities' },
// 		{ label: 'Goals', link: '/goals' },
// 		{ label: 'Activity Execution', link: '/activities/execute' },
// 		{ label: 'Orphans', link: '/orphans' },
// 		{ label: 'Health Info', link: '/healthInfo' },
// 		{ label: 'Behavior Info', link: '/behaviorInfo' },
// 		{ label: 'Criteria Info', link: '/criteriaInfo' },
// 		{ label: 'Emergence Contact Info', link: '/emergenceContactInfo' },
// 		{ label: 'Education Info', link: '/educationInfo' },
// 		{ label: 'Attendance', link: '/attendance' },
// 	],
// };
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
	Rooms: { label: 'Rooms', link: serverLink + 'room/' },

	// HealthInfo: { label: 'Health Info', link: '/healthInfo/' },
	// BehaviorInfo: { label: 'Behavior Info', link: '/behaviorInfo/' },
};
