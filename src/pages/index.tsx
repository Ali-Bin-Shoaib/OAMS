import { ReactNode } from 'react';
import AppHead from '../../components/common/AppHead';
import Test from './orphans/Test';

export default function Home() {
	const date = new Date();
	console.log('🚀 ~ file: index.tsx:6 ~ Home ~ date:', date);
	return (
		<>
			<AppHead title='Home' />
			<h1>Index page</h1>
			<div>
				<h1>Date:{date.toISOString()}</h1>
			</div>
		</>
	);
}
