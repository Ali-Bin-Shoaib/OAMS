import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

// import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from '../../components/common/AppNavbar';
import AppFooter from '../../components/common/AppFooter';

export default function App({ Component, pageProps }: AppProps) {
	return (
		//* the whole app
		<>
			<MantineProvider
				withGlobalStyles
				// withNormalizeCSS
				theme={{
					/** Put your mantine theme override here */
					colorScheme: 'light',
				}}>
				<ModalsProvider>
					<Notifications />
					<div className='h-full w-full'>
						{/* Nav */}
						<AppNavbar />
						{/*content */}
						<div className='bg-slate-50'>
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
