import MyNavbar from '@/components/MyNavbar';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });



export default function App({ Component, pageProps }: AppProps) {
	return (
		// whole app
		<div className={inter.className}>
			<h1 className='bg-gray-500 m-3'>App</h1>

			{/* Nav */}
			<MyNavbar />
			<Component {...pageProps} />

			{/* footer */}
		</div>
	);
}
