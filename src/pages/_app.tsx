import MyHeader from '@/components/MyHeader';
import MyNavbar from '@/components/MyNavbar';
import NewComponent from '@/components/NewComponent';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { v4 } from 'uuid';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
	return (
		// whole app
		<div className={inter.className + ' bg-gray-300 min-h-screen '}>
			{/* <h1 >App</h1> */}

			{/* Nav */}
			{/* <MyNavbar /> */}
			<MyHeader key={v4()}>
				<NewComponent/>
			</MyHeader>
				<div className='m-1 p-1'>
					<Component {...pageProps} />

					{/* footer */}
				</div>
		</div>
	);
}
