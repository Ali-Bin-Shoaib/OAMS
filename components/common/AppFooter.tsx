import { createStyles, Container, Group, Anchor, rem } from '@mantine/core';
import { IconBrandMantine } from '@tabler/icons-react';
import { Paths } from '../../shared/links';
import Image from 'next/image';
import logo from '../../src/img/logo.png';
import Link from 'next/link';
const useStyles = createStyles((theme) => ({
	footer: {
		marginTop: rem(120),
		borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
		backgroundColor: theme.fn.variant({
			variant: 'filled',
			color: theme.colors.blue[1],
		}).background,
		borderBottom: 0,
	},

	inner: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: theme.spacing.xl,
		paddingBottom: theme.spacing.xl,

		[theme.fn.smallerThan('xs')]: {
			flexDirection: 'column',
		},
	},

	links: {
		[theme.fn.smallerThan('sm')]: {
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

interface FooterSimpleProps {
	links: { link: string; label: string }[];
}
export default function AppFooter() {
	const { classes } = useStyles();
	const items = Paths.links.map((link) => (
		<Link key={link.label} href={link.link} className={classes.link}>
			{link.label}
		</Link>
	));

	return (
		<div className={classes.footer}>
			<Container className={classes.inner}>
				<div>
					<Image src={logo} width={150} className='rounded-full' alt={'logo'} />
					OAMS
				</div>
				<Group className={classes.links}>{items}</Group>
			</Container>
		</div>
	);
}
