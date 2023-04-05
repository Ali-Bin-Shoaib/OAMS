import '@/styles/globals.css';
import type { AppProps } from 'next/app';

// import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from '../../components/common/AppNavbar';
import AppFooter from '../../components/common/AppFooter';

export default function App({ Component, pageProps }: AppProps) {
	return (
		//* the whole app
		<>
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
		</>
	);
}
