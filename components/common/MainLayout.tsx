import { ReactNode } from 'react';
import AppFooter from './AppFooter';
import AppNavbar from './AppNavbar';
import Providers from './Providers';
interface Props {
	children: ReactNode;
}
function MainLayout({ children }: Props) {
	return (
		<>
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
