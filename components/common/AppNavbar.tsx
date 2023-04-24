import { ReactNode } from 'react';
import { createStyles, Container, Group, Burger, rem, Header, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconHome, IconMoonStars, IconSun } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import MyLink from './MyLink';
import { Paths } from '../../shared/links';

const useStyles = createStyles((theme) => ({
	header: {
		backgroundColor: theme.fn.variant({
			variant: 'filled',
			color: theme.primaryColor,
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

interface Props {
	updateThem: () => void;
	// children: ReactNode;
	them: 'light' | 'dark';
}

export default function AppNavbar({ updateThem, them }: Props) {
	const [opened, { toggle }] = useDisclosure(false);
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
					<IconHome onClick={() => router.push('/')} size={28} />
					<Group spacing={5} className={classes.links}>
						{items}
					</Group>
					<Burger opened={opened} onClick={toggle} className={classes.burger} size='sm' color='#fff' />
					<Group position='center' my='xl'>
						<ActionIcon
							onClick={() => updateThem()}
							size='lg'
							sx={(theme) => ({
								backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
								color: theme.colorScheme === 'dark' ? theme.colors.yellow[6] : theme.colors.blue[6],
							})}>
							{them === 'dark' ? <IconSun size='1.2rem' /> : <IconMoonStars size='1.2rem' />}
						</ActionIcon>
					</Group>
				</div>
			</Header>
		</>
	);
}
