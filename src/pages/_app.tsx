import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

// import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from '../../components/common/AppNavbar';
import AppFooter from '../../components/common/AppFooter';
import { useState } from 'react';
import Providers from '../../components/common/Providers';
import MainLayout from '../../components/common/MainLayout';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<MainLayout>
				<Component {...pageProps} />
			</MainLayout>
		</>
	);
}
