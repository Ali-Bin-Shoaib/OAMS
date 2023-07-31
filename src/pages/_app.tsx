import './../styles/globals.css';
import type { AppProps } from 'next/app';
import MainLayout from '../../components/common/MainLayout';
import { SessionProvider } from 'next-auth/react';

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
const queryClient = new QueryClient();

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<>
			{/* <QueryClientProvider client={queryClient}> */}
			<SessionProvider session={session}>
				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>
			</SessionProvider>
			{/* </QueryClientProvider> */}
		</>
	);
}
