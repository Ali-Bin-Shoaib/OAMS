import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { ReactNode } from 'react';

interface Props {
	children: ReactNode;
	them: 'light' | 'dark';
}

function Providers({ them, children }: Props) {
	return (
		<>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					/** Put your mantine theme override here */
					colorScheme: them,
				}}>
				<ModalsProvider>
					<Notifications />
					{children}
				</ModalsProvider>
			</MantineProvider>
		</>
	);
}

export default Providers;
