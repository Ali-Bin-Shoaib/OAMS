import {
	Header,
	Menu,
	Group,
	Center,
	Burger,
	Container,
	ActionIcon,
	Transition,
	Paper,
	Drawer,
	useMantineTheme,
	Tooltip,
	Loader,
	Badge,
	Button,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBell, IconChevronDown, IconHome, IconLogin, IconLogout } from '@tabler/icons-react';
import { Paths, serverLink } from '../../shared/links';
import Link from 'next/link';
// import { usePageTitle } from 'hooks/usePageTitle';
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { v4 } from 'uuid';
import { usePageTitle } from 'lib/hooks/usePageTitle';
import NotificationComponent, { updateNotification } from './NotificationComponent';
import axios from 'axios';
import { ResponseType, STATUS_CODE } from 'types';
import SuperJSON from 'superjson';
import { Notification, UserType } from '@prisma/client';
import { Url } from 'next/dist/shared/lib/router/router';
export default function AppNavbar() {
	const [opened, { toggle, open, close }] = useDisclosure(false);
	const [isOpen, setIsOpen] = useState(false);
	const theme = useMantineTheme();
	const currentPage = usePageTitle();
	const { data: session } = useSession();
	const [adminNotifications, setAdminNotifications] = useState<Notification[] | null>(null);
	console.log('🚀 ~ file: AppNavbar.tsx:40 ~ AppNavbar ~ adminNotifications:', adminNotifications);
	const [hydration, setHydration] = useState(false);
	const isActive = ' shadow-md border-b-2 border-x-0 border-t-0 border-white border-solid border';
	const [isNotificationUpdated, setIsNotificationUpdated] = useState(false);
	// console.log('🚀 ~ file: AppNavbar.tsx:43 ~ AppNavbar ~ updateNotification:', isNotificationUpdated);
	const updateNotifications = () => {
		setIsNotificationUpdated(!isNotificationUpdated);
	};
	const toggleDrawer = (value: boolean) => setIsOpen(value);
	const getNotifications = async () => {
		try {
			const response = await axios.get<ResponseType>(`${serverLink}api/notification`);
			if (response.status === STATUS_CODE.OK) {
				const notifications = SuperJSON.parse(response.data.data) as Notification[];
				setAdminNotifications(notifications.length > 0 ? notifications : null);
			}
		} catch (error) {
			if (axios.isAxiosError(error)) setAdminNotifications(null);
			console.log('🚀 ~ file: AppNavbar.tsx:56 ~ getNotifications ~ error:', error.response?.data);
		}
	};

	// useEffect(() => {
	// }, []);
	useEffect(() => {
		(session?.user.type === UserType.ADMIN || !adminNotifications) && getNotifications();
		setHydration(true);
		setIsNotificationUpdated(true);
	}, [session?.user.type, isNotificationUpdated]);
	const items = Paths.links.map((link) => {
		const menuItems = link.relatedLinks?.map((item) => {
			return (
				<Menu.Item key={v4()} sx={{ backgroundColor: '#0077b6' }}>
					<Link //inside menu 'attendance' ,'goals'
						href={item.link}
						aria-label={item.label}
						className={` block leading-none px-2 py-3 rounded-sm  font-semibold -m-2 no-underline
						hover:border-b-2 hover:border-x-0 hover:border-t-0 hover:border-white hover:border-solid hover:border
						${item.label === currentPage && isActive}`}
						style={{
							color: theme.colors.gray[0],
							backgroundColor: '#0077b6',
						}}>
						<Center>{item.label}</Center>
					</Link>
				</Menu.Item>
			);
		});

		if (menuItems) {
			return (
				<Menu
					key={link.label}
					// classNames={
					// 	link.label === currentPage ? isActive : ' '
					// }
					withArrow
					transitionProps={{ exitDuration: 0 }}
					withinPortal>
					<Menu.Target>
						<Link //menu label 'orphan' , 'activities'
							href={link.link}
							aria-label={link.label}
							onClick={(e) => e.preventDefault()}
							className={` text-lg block leading-none px-2 py-3 rounded-sm font-semibold no-underline hover:border-b-2 hover:border-x-0 hover:border-t-0 hover:border-white hover:border-solid hover:border${
								link.label === currentPage && isActive
							}`}
							style={{
								color: theme.colors.gray[0],
								background: '#0077b6',
							}}>
							<Center>
								{link.label}
								<IconChevronDown size='0.9rem' stroke={1.5} />
							</Center>
						</Link>
					</Menu.Target>
					<Menu.Dropdown style={{ backgroundColor: '#0077b6' }}>{menuItems}</Menu.Dropdown>
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
				${link.label === currentPage && isActive} `}
				style={{
					color: theme.colors.gray[0],
				}}>
				{link.label}
			</Link>
		);
	});
	if (!hydration) return <Loader />;
	return (
		<Header height={60} sx={{ backgroundColor: '#0077b6' }}>
			<Container fluid>
				<div className={`flex flex-row  items-center justify-between h-14`}>
					<Link
						href={'/'}
						className='no-underline '
						aria-label='Home Page'
						style={{
							color: theme.colors.gray[0],
						}}>
						<IconHome size={28} />
					</Link>
					<Group spacing={5} className={'max-[1120px]:hidden'}>
						{session?.user && items}
					</Group>

					<Group position='right' className='sm:flex md:items-center min-w-fit '>
						<Drawer
							opened={isOpen}
							position='right'
							overlayProps={{ opacity: 0.5, blur: 4 }}
							onClose={() => setIsOpen(!isOpen)}
							title='Notification'>
							{/* Drawer Content */}
							{adminNotifications && (
								<>
									<Tooltip label={'set all notifications as shown'}>
										<Center>
											<Button
												color='red'
												onClick={() => {
													updateNotification();
													updateNotifications();
													setIsOpen(!isOpen);
												}}>
												Clear all notifications
											</Button>
										</Center>
									</Tooltip>
									{adminNotifications?.map((x) => (
										<NotificationComponent
											key={v4()}
											updateNotifications={updateNotifications}
											toggleDrawer={toggleDrawer}
											notification={x}
											redirectUrl={x.triggerUrl as Url}
										/>
									))}
								</>
							)}
						</Drawer>
						{session?.user ? (
							<div className='flex flex-row items-center'>
								<div className='flex flex-col items-center'>
									<span
										className='hidden sm:block text-white text-ellipsis overflow-hidden font-semibold text-base 
									text-end sx:flex items-center w-52 h-11 md:w-auto md:h-auto md:mr-6'>
										{session.user.name}
									</span>
									<span
										className='hidden sm:block text-white text-ellipsis overflow-hidden font-semibold text-base
									text-end sx:flex items-center w-52 h-11 md:w-auto md:h-auto md:mr-6'>
										{session.user.type}
									</span>
								</div>
								<Tooltip label={'Logout'}>
									<ActionIcon variant='default' size='lg' onClick={() => signOut()}>
										<IconLogout />
									</ActionIcon>
								</Tooltip>
							</div>
						) : (
							<>
								<Tooltip label={'Login'}>
									<ActionIcon variant='default' size='lg' onClick={() => signIn()}>
										<IconLogin />
									</ActionIcon>
								</Tooltip>
							</>
						)}
						<ActionIcon variant='default' onClick={() => setIsOpen(!isOpen)} size='lg'>
							<div className='flex flex-wrap justify-evenly'>
								<IconBell />
								{adminNotifications && (
									<Badge color='red' size='xs' className='absolute ml-9'>
										{adminNotifications?.length}
									</Badge>
								)}
							</div>
						</ActionIcon>

						{/* <ActionIcon variant='light' onClick={() => toggleColorScheme()} size='lg'>
							{colorScheme === 'dark' ? (
								<IconSun size='1.2rem' color={theme.colors.yellow[5]} />
							) : (
								<IconMoonStars size='1.2rem' />
							)}
						</ActionIcon> */}
					</Group>

					<Burger opened={opened} onClick={toggle} className={`min-[1121px]:hidden`} size='md' />
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
