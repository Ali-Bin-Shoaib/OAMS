import {
	createStyles,
	Header,
	Menu,
	Group,
	Center,
	Burger,
	Container,
	ActionIcon,
	useMantineColorScheme,
	Transition,
	Paper,
	Drawer,
	useMantineTheme,
	Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
	IconBell,
	IconChevronDown,
	IconHome,
	IconLogin,
	IconLogout,
	IconMoonStars,
	IconSun,
} from '@tabler/icons-react';
import { Paths } from '../../shared/links';
import Link from 'next/link';
import { usePageTitle } from '../../hooks/usePageTitle';
import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function AppNavbar() {
	const [opened, { toggle, open, close }] = useDisclosure(false);
	const [isOpen, setIsOpen] = useState(false);
	const theme = useMantineTheme();
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const currentPage = usePageTitle();
	const { data: session } = useSession();
	console.log('🚀 ~ file: AppNavbar.tsx:40 ~ AppNavbar ~ session:', session);
	const items = Paths.links.map((link) => {
		const menuItems = link.relatedLinks?.map((item) => {
			return (
				<Menu.Item key={item.link} className=''>
					<Link //inside menu 'attendance' ,'goals'
						href={item.link}
						aria-label={item.label}
						className={` block leading-none px-2 py-3 rounded-sm  font-semibold -m-2 no-underline
						hover:border-b-2 hover:border-x-0 hover:border-t-0 hover:border-white hover:border-solid hover:border
						${item.label === currentPage && ' border-b-2 border-x-0 border-t-0 border-white border-solid border'}`}
						style={{
							color: theme.colors.gray[0],
							background: theme.colorScheme === 'dark' ? theme.colors.blue[8] : theme.colors.blue[6],
						}}>
						<Center>{item.label}</Center>
					</Link>
				</Menu.Item>
			);
		});

		if (menuItems) {
			return (
				<Menu key={link.label} trigger='hover' withArrow transitionProps={{ exitDuration: 0 }} withinPortal>
					<Menu.Target>
						<Link //menu label 'orphan' , 'activities'
							href={link.link}
							aria-label={link.label}
							className={` text-lg block leading-none px-2 py-3 rounded-sm font-semibold no-underline
							hover:border-b-2 hover:border-x-0 hover:border-t-0 hover:border-white hover:border-solid hover:border
							${link.label === currentPage && ' border-b-2 border-x-0 border-t-0 border-white border-solid border'}`}
							style={{
								color: theme.colors.gray[0],
								background: theme.colorScheme === 'dark' ? theme.colors.blue[8] : theme.colors.blue[6],
							}}>
							<Center>
								{link.label}
								<IconChevronDown size='0.9rem' stroke={1.5} />
							</Center>
						</Link>
					</Menu.Target>
					<Menu.Dropdown bg={'blue'}>{menuItems}</Menu.Dropdown>
				</Menu>
			);
		}

		return (
			<Link //out of menu 'users', 'guardians'...
				key={link.label}
				href={link.link}
				aria-label={link.label}
				className={`text-lg block leading-none px-2 py-3 rounded-sm font-semibold no-underline
				 hover:border-b-2 hover:border-x-0 hover:border-t-0 hover:border-white hover:border-solid hover:border
				 ${link.label === currentPage && ' border-b-2 border-x-0 border-t-0 border-white border-solid border'} `}
				style={{
					color: theme.colors.gray[0],
				}}>
				{link.label}
			</Link>
		);
	});
	return (
		<Header height={56} mb={10} bg={'blue'}>
			<Container fluid>
				<div className={`flex items-center justify-between h-14`}>
					<Link
						href={'/'}
						className='no-underline '
						aria-label='Home Page'
						style={{
							color: theme.colors.gray[0],
						}}>
						<IconHome size={28} />
					</Link>
					<Group spacing={5} className={'max-[870px]:hidden'}>
						{items}
					</Group>
					<Group position='center' my='xl'>
						<Drawer
							opened={isOpen}
							position='right'
							overlayProps={{ opacity: 0.5, blur: 4 }}
							onClose={() => setIsOpen(!isOpen)}
							title='Notification'>
							{/* Drawer content */}
						</Drawer>
						{session?.user && <span className='text-white'>{session.user.name}</span>}
						{session?.user ? (
							<Tooltip label={'Sign Out'}>
								<ActionIcon variant='default' size='lg' onClick={() => signOut()}>
									<IconLogout />
								</ActionIcon>
							</Tooltip>
						) : (
							<Tooltip label={'Sign In'}>
								<ActionIcon variant='default' size='lg' onClick={() => signIn()}>
									<IconLogin />
								</ActionIcon>
							</Tooltip>
						)}
						<ActionIcon variant='light' onClick={() => setIsOpen(!isOpen)} size='lg'>
							<IconBell />
						</ActionIcon>

						<ActionIcon variant='light' onClick={() => toggleColorScheme()} size='lg'>
							{colorScheme === 'dark' ? (
								<IconSun size='1.2rem' color={theme.colors.yellow[5]} />
							) : (
								<IconMoonStars size='1.2rem' />
							)}
						</ActionIcon>
					</Group>

					<Burger opened={opened} onClick={toggle} className={`min-[870px]:hidden`} size='md' />
					<Transition transition='pop-top-right' duration={200} mounted={opened}>
						{(styles) => (
							<Paper
								className={`absolute top-16 right-20 overflow-hidden z-50 min-[870px]:hidden`}
								withBorder
								style={{ background: theme.colors.blue[6] }}>
								{items}
							</Paper>
						)}
					</Transition>
				</div>
			</Container>
		</Header>
	);
}
