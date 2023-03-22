import MyNavbar from '@/components/MyNavbar';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../theme';
import createEmotionCache from '../createEmotionCache';

const inter = Inter({ subsets: ['latin'] });

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

	return (
		<CacheProvider value={emotionCache}>
			<ThemeProvider theme={theme}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<MyNavbar />
				<Component {...pageProps} />
			</ThemeProvider>
		</CacheProvider>

		// // whole app
		// <div className={inter.className}>
		// 	<h1 className='bg-gray-500 m-3'>App</h1>

		// 	{/* Nav */}
		// 	<MyNavbar />
		// 	<Component {...pageProps} />

		// 	{/* footer */}
		// </div>
	);
}
