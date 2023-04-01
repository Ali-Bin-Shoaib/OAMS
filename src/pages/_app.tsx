import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

import AppNavbar from '@/components/AppNavbar';
import AppFooter from '@/components/AppFooter';
import AppHead from '@/components/AppHead';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
	return (
		//* the whole app
		<>
			<AppHead />
			<div className={inter.className}>
				{/* Nav */}
				<AppNavbar />
				<Component {...pageProps} />
				{/* Footer */}
				<AppFooter />
			</div>
		</>
	);
}
