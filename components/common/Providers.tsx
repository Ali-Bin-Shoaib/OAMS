import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { ReactNode, createContext, useState } from 'react';

interface Props {
	children: ReactNode;
}

function Providers({ children }: Props) {
	const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

	return (
		<>
			<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
				<MantineProvider
					theme={{
						colorScheme,
					}}
					withGlobalStyles
					withNormalizeCSS>
					<ModalsProvider>
						<Notifications />
						{children}
					</ModalsProvider>
				</MantineProvider>
			</ColorSchemeProvider>
		</>
	);
}

export default Providers;
