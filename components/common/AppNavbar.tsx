import {
	createStyles,
	Group,
	Burger,
	rem,
	Header,
	ActionIcon,
	useMantineColorScheme,
	Switch,
	useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconHome, IconMoonStars, IconSun } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import MyLink from './MyLink';
import { Pages, Paths } from '../../shared/links';
import Image from 'next/image';
import img from '../../src/img/simeLogo.png';
import DropDownList from './DropDownList';

const useStyles = createStyles((theme) => ({
	header: {
		backgroundColor: theme.fn.variant({
			variant: 'filled',
			color: theme.colors.blue[1],
		}).background,
		borderBottom: 0,
	},

	inner: {
		height: rem(56),
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	links: {
		[theme.fn.smallerThan('sm')]: {
			display: 'none',
		},
	},

	burger: {
		[theme.fn.largerThan('sm')]: {
			display: 'none',
		},
	},

	link: {
		display: 'block',
		lineHeight: 1,
		padding: `${rem(8)} ${rem(12)}`,
		borderRadius: theme.radius.sm,
		textDecoration: 'none',
		color: theme.white,
		fontSize: theme.fontSizes.sm,
		fontWeight: 500,

		'&:hover': {
			backgroundColor: theme.fn.lighten(
				theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
				0.1
			),
		},
	},

	linkLabel: {
		marginRight: rem(5),
	},
}));

export default function AppNavbar() {
	const [opened, { toggle }] = useDisclosure(false);
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const { classes } = useStyles();
	const router = useRouter();

	const items = Paths.links.map((link) => {
		return (
			<MyLink
				key={link.label}
				href={link.link}
				className={`${router.asPath == link.link ? 'underline underline-offset-8 ' : ''} ${classes.link}`}
				// className={`${router.asPath == link.link ? ' underline-offset-8 no-underline' : ''} `}
				text={link.label}
			/>
		);
	});
	// const x = [Pages.Orphans, Pages.BehaviorInfo, Pages.HealthInfo];
	return (
		<>
			<Header height={72} className={classes.header + ' px-1'} mb={10}>
				{/* <Header height={72} mb={10}> */}
				<div className={classes.inner}>
					{/* <Group position='apart'> */}
					<Image src={img} onClick={() => router.push('/')} width={50} className='rounded-full' height={50} alt={'Home'} />
					<Group spacing={1} className={classes.links}>
						{items}
					</Group>
					{/* <Group spacing={1} className={classes.links}>
						<DropDownList
							target={'Manage Orphans'}
							label={'Orphans'}
							classes={classes.link}
							links={[{ label: Pages.Orphans.label, link: Pages.Orphans.link }]}
						/>
					</Group> */}
					{/* <Group spacing={1}>{items}</Group> */}
					<Burger opened={opened} onClick={toggle} className={classes.burger} size='sm' color='#fff' />
					{/* <Burger opened={opened} onClick={toggle} size='sm' color='#fff' /> */}

					<Group position='center' my='xl'>
						<ActionIcon
							onClick={() => toggleColorScheme()}
							size='lg'
							sx={(theme) => ({
								backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
								color: theme.colorScheme === 'dark' ? theme.colors.yellow[6] : theme.colors.gray[6],
							})}>
							{colorScheme === 'dark' ? <IconSun size='1.2rem' /> : <IconMoonStars size='1.2rem' />}
						</ActionIcon>
					</Group>
					{/* </Group> */}
				</div>
			</Header>
		</>
	);
}
// import { Header, Group, Menu, Button, Text, useMantineTheme, MediaQuery, Burger, ActionIcon } from '@mantine/core';
// import { IconSun, IconMoonStars } from '@tabler/icons-react';
// import { useRouter } from 'next/router';
// import { useDisclosure } from '@mantine/hooks';
// import { useMantineColorScheme } from '@mantine/core';
// import Image from 'next/image';
// import img from '../../src/img/simeLogo.png';
// import MyLink from './MyLink';
// import { Paths } from '../../shared/links';

// export default function AppNavbar() {
// 	const [opened, { toggle }] = useDisclosure(false);
// 	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
// 	const router = useRouter();
// 	const theme = useMantineTheme();

// 	const items = Paths.links.map((link) => {
// 		return <MyLink key={link.label} href={link.link} text={link.label} onClick={undefined} />;
// 	});

// 	return (
// 		<>
// 			<Header height={72} mb={10}>
// 				<Group position='apart'>
// 					<Image src={img} onClick={() => router.push('/')} width={50} className='rounded-full' height={50} alt={'Home'} />
// 					{/* Use MediaQuery component to hide the group of links on smaller screens */}
// 					<MediaQuery smallerThan='xl' styles={{ display: 'none' }}>
// 						<Group spacing={1} className=''>{items}</Group>
// 					</MediaQuery>
// 					{/* Use Burger component to create a toggle button for the navbar on smaller screens */}
// 					<MediaQuery largerThan='xl' styles={{ display: 'none' }}>
// 						<Burger opened={opened} onClick={toggle} size='sm' color={theme.black} />
// 					</MediaQuery>

// 					<Group position='center' my='xl'>
// 						<ActionIcon
// 							onClick={() => toggleColorScheme()}
// 							size='lg'
// 							sx={(theme) => ({
// 								backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
// 								color: theme.colorScheme === 'dark' ? theme.colors.yellow[6] : theme.colors.gray[6],
// 							})}>
// 							{colorScheme === 'dark' ? <IconSun size='1.2rem' /> : <IconMoonStars size='1.2rem' />}
// 						</ActionIcon>
// 					</Group>
// 				</Group>
// 			</Header>
// 			{/* Use MediaQuery component to show the navbar on smaller screens when the burger is opened */}
// 			<MediaQuery smallerThan='xl' styles={{ display: opened ? 'block' : 'none' }}>
// 				<Group spacing={1}>{items}</Group>
// 			</MediaQuery>
// 		</>
// 	);
// }
