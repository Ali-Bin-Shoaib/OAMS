import { createStyles, Box, Text, Group, rem } from '@mantine/core';
import { IconListSearch } from '@tabler/icons-react';
import { orphanWithGuardianAndSponsorshipInfo } from '../../types';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
	link: {
		...theme.fn.focusStyles(),
		display: 'block',
		textDecoration: 'none',
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
		lineHeight: 1.2,
		fontSize: theme.fontSizes.sm,
		padding: theme.spacing.xs,
		borderTopRightRadius: theme.radius.sm,
		borderBottomRightRadius: theme.radius.sm,
		borderLeft: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,

		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
		},
	},

	linkActive: {
		fontWeight: 500,
		borderLeftColor: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 6 : 7],
		color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 2 : 7],

		'&, &:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
					: theme.colors[theme.primaryColor][0],
		},
	},
}));

interface Props {
	orphans: orphanWithGuardianAndSponsorshipInfo[];
	active: string;

	updateCard: (orphan: orphanWithGuardianAndSponsorshipInfo) => void;
}

export function TableOfContents({ orphans, active, updateCard }: Props) {
	const { classes, cx } = useStyles();
	const items = orphans.map((item) => (
		<Box
			onClick={(event) => updateCard(item)}
			key={item.id}
			className={cx(classes.link, { [classes.linkActive]: active === item.name })}
			sx={(theme) => ({ paddingLeft: `calc(${1} * ${theme.spacing.md})` })}>
			{item.name}
		</Box>
	));

	return (
		<div>
			<Group mb='md'>
				<IconListSearch size='1.1rem' stroke={1.5} />
				<Text>قائمة الأيتام</Text>
			</Group>
			{items}
		</div>
	);
}
