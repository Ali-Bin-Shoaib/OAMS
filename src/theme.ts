import { Inter, Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { red,blue } from '@mui/material/colors';

export const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
	fallback: ['Helvetica', 'Arial', 'sans-serif'],
});
const inter = Inter({ subsets: ['latin'] });

// Create a theme instance.
const theme = createTheme({
	palette: {
		primary: {
			// main: '#556cd6',
			main: blue.A400,
		},
		secondary: {
			main: '#19857b',
		},
		error: {
			main: red.A400,
		},
	},
	typography: {
		// fontFamily: roboto.style.fontFamily,
		fontFamily: inter.style.fontFamily,
	},
});

export default theme;
