import './../styles/globals.css';
import type { AppProps } from 'next/app';
import MainLayout from '../../components/common/MainLayout';
// import {
// 	QueryClient,
// 	QueryClientProvider,
// 	useQuery,
// } from '@tanstack/react-query'
// const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			{/* <QueryClientProvider client={queryClient}> */}

			<MainLayout>
				<Component {...pageProps} />
			</MainLayout>
			{/* </QueryClientProvider> */}
		</>
	);
}
