import { ReactNode } from 'react';
import AppFooter from './AppFooter';
import AppNavbar from './AppNavbar';
import Providers from './Providers';
import AppHead from './AppHead';
import { usePageTitle } from '../../hooks/usePageTitle';
interface Props {
	children: ReactNode;
}
function MainLayout({ children }: Props) {
	const title = usePageTitle();
	return (
		<>
			<AppHead title={title} />
			<Providers>
				<div className='h-full w-full'>
					{/* Nav */}
					<AppNavbar />
					{children}
					{/*content */}

					{/* Footer */}
					<AppFooter />
				</div>
			</Providers>
		</>
	);
}
export default MainLayout;
