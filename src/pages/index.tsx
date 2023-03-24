import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home({
	params,
	searchParams,
}: {
	params: { slug: string };
	searchParams?: { [key: string]: string | string[] | undefined };
}) {
	return (
		<>
			<h1>Index page</h1>
		</>
	);
}
