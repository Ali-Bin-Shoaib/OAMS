import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { ReactNode, useContext, useState } from 'react';
import { ColorSchemeContext } from '../../shared/contexts';

interface Props {
	children: ReactNode;
}

function Providers({ children }: Props) {
	const colorSchemeContext = useContext(ColorSchemeContext);
	const [colorScheme, setColorScheme] = useState<ColorScheme>(colorSchemeContext);
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

	return (
		<>
			<ColorSchemeContext.Provider value={colorScheme}>
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
			</ColorSchemeContext.Provider>
		</>
	);
}

export default Providers;
