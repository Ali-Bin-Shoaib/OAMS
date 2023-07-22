import { createStyles, Container, Group, Anchor, rem, Text, Center } from '@mantine/core';
import { IconHome } from '@tabler/icons-react';
import { Paths } from '../../shared/links';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
	footer: {
		marginTop: rem(120),
		borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[0]}`,
		background: theme.colors.blue[7],
		color: 'white',
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
		[theme.fn.smallerThan('xs')]: {
			marginTop: theme.spacing.md,
		},
	},
}));


export default function AppFooter() {
	const { classes } = useStyles();
	const items = Paths.links.map((link) => (
		<Link className='text-white no-underline hover:shadow' key={link.label} href={link.link}>
			{link.label}
		</Link>
	));

	return (
		<div className={classes.footer+ ' align-baseline'}>
			<Container className={classes.inner}>
				<IconHome size={28} />
				<Group className={classes.links}>{items}</Group>
			</Container>
			<Center p={10} m={10}>
				<Text size='sm'>© {new Date().getFullYear()} oams.com All rights reserved.</Text>
			</Center>
		</div>
	);
}
