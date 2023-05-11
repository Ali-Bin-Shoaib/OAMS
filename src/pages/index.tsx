import AppHead from '../../components/common/AppHead';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function Home() {
	const title = usePageTitle();
	return (
		<>
			<AppHead title={title} />
			<h1>Index page</h1>
		</>
	);
}
