import { ReactNode } from 'react';
import AppFooter from './AppFooter';
import AppNavbar from './AppNavbar';
import Providers from './Providers';
import AppHead from './AppHead';
// import { usePageTitle } from '../../hooks/usePageTitle';
import { useSession } from 'next-auth/react';
import { usePageTitle } from 'lib/hooks/usePageTitle';
interface Props {
	children: ReactNode;
}
export default function MainLayout({ children }: Props) {
	const title = usePageTitle();
	return (
		<>
			<AppHead title={title} />
			<Providers>
				<div className='h-full w-full'>
					{/* Nav */}
					<AppNavbar />
					{/*content */}
					{children}
					{/* Footer */}
					<AppFooter />
				</div>
			</Providers>
		</>
	);
}
