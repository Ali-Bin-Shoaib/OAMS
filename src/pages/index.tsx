import Box from '@mui/material/Box';
export default function Home({
	params,
	searchParams,
}: {
	params: { slug: string };
	searchParams?: { [key: string]: string | string[] | undefined };
}) {
	return (
		<>
			<h1 className='text-3xl'>Home page</h1>
		</>
	);
}
