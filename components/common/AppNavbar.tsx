import {
	createStyles,
	Header,
	Menu,
	Group,
	Center,
	Burger,
	Container,
	rem,
	ActionIcon,
	useMantineColorScheme,
	Transition,
	Paper,
	Button,
	Drawer,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
	IconBell,
	IconBellMinus,
	IconChevronDown,
	IconHome,
	IconMoonStars,
	IconNotification,
	IconPill,
	IconSun,
} from '@tabler/icons-react';
import { Paths } from '../../shared/links';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
	link: {
		'&:hover': {
			backgroundColor: theme.fn.lighten(
				theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
				0.1
			),
		},
	},
}));

export default function AppNavbar() {
	const [opened, { toggle, open, close }] = useDisclosure(false);
	const { classes, theme } = useStyles();
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const items = Paths.links.map((link) => {
		const menuItems = link.relatedLinks?.map((item) => (
			<Menu.Item key={item.link} className={`${classes.link}`}>
				<Link
					href={item.link}
					aria-label={item.label}
					className={`block leading-none px-2 py-3 rounded-sm no-underline font-semibold -m-2 ${classes.link}`}
					style={{
						color: theme.colors.gray[0],
						background: theme.colorScheme === 'dark' ? theme.colors.blue[8] : theme.colors.blue[6],
					}}>
					<Center>{item.label}</Center>
				</Link>
			</Menu.Item>
		));

		if (menuItems) {
			return (
				<Menu key={link.label} trigger='hover' transitionProps={{ exitDuration: 0 }} withinPortal>
					<Menu.Target>
						<Link
							href={link.link}
							aria-label={link.label}
							className={`text-lg block leading-none px-2 py-3 rounded-sm no-underline font-semibold ${classes.link}`}
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
			<Link
				key={link.label}
				href={link.link}
				aria-label={link.label}
				className={`text-lg block leading-none px-2 py-3 rounded-sm no-underline font-semibold ${classes.link}`}
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
							opened={opened}
							position='right'
							overlayProps={{ opacity: 0.5, blur: 4 }}
							onClose={close}
							title='Notification'>
							{/* Drawer content */}
						</Drawer>

						<ActionIcon variant='light' onClick={open} size='lg'>
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
