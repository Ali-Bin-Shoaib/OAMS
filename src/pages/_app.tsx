import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

// import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from '../../components/common/AppNavbar';
import AppFooter from '../../components/common/AppFooter';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
	const [them, setThem] = useState<'light' | 'dark'>('light');
	const updateThem = () =>
		them === 'light' ? setThem('dark') : setThem('light');
	// them === 'light' ? console.log('true') : console.log('false');

	return (
		//* the whole app
		<>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					/** Put your mantine theme override here */
					colorScheme: them,
				}}>
				<ModalsProvider>
					<Notifications />
					<div className='h-full w-full'>
						{/* Nav */}
						<AppNavbar updateThem={updateThem} />
						{/*content */}
						<div className='bg-slate-100'>
							<Component {...pageProps} />
						</div>
						{/* Footer */}
						<AppFooter />
					</div>
				</ModalsProvider>
			</MantineProvider>
		</>
	);
}
