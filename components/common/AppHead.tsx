import Head from 'next/head';
interface Props {
	title: string;
	iconLink?: string | '../../public/favicon.ico';
	iconRel?: string | 'icon';
}
function AppHead({ title, iconLink, iconRel }: Props) {
	return (
		<Head>
			<title>{title}</title>
			<link rel={iconRel} href={iconLink} />
		</Head>
	);
}
export default AppHead;
