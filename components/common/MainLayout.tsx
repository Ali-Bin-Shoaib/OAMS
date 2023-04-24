import { ReactNode, useState } from 'react';
import AppFooter from './AppFooter';
import AppNavbar from './AppNavbar';
import Providers from './Providers';
interface Props {
	children: ReactNode;
}
function MainLayout({ children }: Props) {
	const [them, setThem] = useState<'light' | 'dark'>('light');
	const updateThem = () => {
		them === 'light' ? setThem('dark') : setThem('light');
	};
	return (
		<>
			<Providers them={them}>
				<div className='h-full w-full'>
					{/* Nav */}
					<AppNavbar updateThem={updateThem} them={them} />
					{children}
					{/*content */}

					{/* Footer */}
					{/* <AppFooter /> */}
				</div>
			</Providers>
		</>
	);
}
export default MainLayout;
