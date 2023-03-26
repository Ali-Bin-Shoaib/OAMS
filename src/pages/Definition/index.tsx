import { useRouter } from 'next/router';

import 'antd/dist/reset.css';
import Word from '../dictionary/[search]';
import Link from 'next/link';
import NotFound from '../notFound';
export default function Definition() {
	const navigate = useRouter();
	return (
		<>
			<Link href={'/Dictionary'}>search new word</Link>
			<NotFound />
		</>
	);
}
