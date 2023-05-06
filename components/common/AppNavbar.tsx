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
import { Paths } from '../../shared/links';
import Image from 'next/image';
import img from '../../src/img/simeLogo.png';

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
	const theme = useMantineTheme();
	const { classes } = useStyles();
	const router = useRouter();

	const items = Paths.links.map((link) => {
		return (
			<MyLink
				key={link.label}
				href={link.link}
				className={`${router.asPath === link.link ? ' underline underline-offset-8 ' : ''} ${classes.link}`}
				text={link.label}
			/>
		);
	});

	return (
		<>
			<Header height={56} className={classes.header + ' px-2'} mb={15}>
				<div className={classes.inner}>
					<Image src={img} onClick={() => router.push('/')} width={50} className='rounded-full' height={50} alt={'Home'} />
					<Group spacing={5} className={classes.links}>
						{items}
					</Group>
					<Burger opened={opened} onClick={toggle} className={classes.burger} size='sm' color='#fff' />
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
				</div>
			</Header>
		</>
	);
}
