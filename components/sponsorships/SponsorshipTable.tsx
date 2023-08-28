import { Orphan, Prisma, Sponsor, Sponsorship, User } from '@prisma/client';
import { useMemo } from 'react';
import { MRT_ColumnDef } from 'mantine-react-table';
import { _Sponsor } from '../../types';
import TableComponent from 'components/common/TableComponent';
import { Badge } from '@mantine/core';

interface Props {
	sponsorships: (Sponsorship & { Orphan: Pick<Orphan, 'id' | 'name' | 'gender' | 'evaluation'> })[];
	actions?: boolean;
}

function SponsorshipTable({ sponsorships, actions = true }: Props) {
	console.log('🚀 ~ file: SponsorshipTable.tsx:14 ~ SponsorshipTable ~ sponsorships:', sponsorships);
	const columns = useMemo<MRT_ColumnDef<Sponsorship & { Sponsor: Sponsor & { user: User }; Orphan: Orphan }>[]>(
		() => [
			{
				accessorFn: (row) => row.id,
				id: 'id',
				header: 'id',
				maxSize: 100,
				minSize: 80,
				size: 80,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.Sponsor?.user?.name,
				id: 'Sponsor.user.name',
				header: 'Sponsor name',
				maxSize: 300,
				minSize: 80,
				size: 120,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.Orphan?.name,
				id: 'Orphan.name',
				header: 'Orphan name',
				maxSize: 300,
				minSize: 80,
				size: 120,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.Orphan?.evaluation?.toFixed(2),
				id: 'Orphan.evaluation',
				header: 'evaluation',
				maxSize: 300,
				minSize: 80,
				size: 120,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.startDate.toDateString(),
				id: 'startDate',
				header: 'startDate',
				maxSize: 100,
				minSize: 80,
				size: 90,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.endDate.toDateString(),
				id: 'endDate',
				header: 'endDate',
				maxSize: 100,
				minSize: 80,
				size: 90,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.paymentMethod,
				id: 'paymentMethod',
				header: 'paymentMethod',
				maxSize: 100,
				minSize: 80,
				size: 90,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.sponsorshipPeriod,
				id: 'sponsorshipPeriod',
				header: 'sponsorshipPeriod',
				maxSize: 100,
				minSize: 80,
				size: 90,
				enableResizing: true,
			},
			{
				accessorFn: (row) => (row.isActive ? <Badge color='lime'>Yes</Badge> : <Badge color='red'>No</Badge>),
				id: 'isActive',
				header: 'isActive',
				maxSize: 90,
				minSize: 80,
				size: 80,
				enableResizing: true,
			},
		],
		[]
	);
	return (
		<TableComponent
			data={sponsorships}
			columns={
				actions ? columns.filter((x) => x.id !== 'Orphan.evaluation') : columns.filter((x) => x.id !== 'Sponsor.user.name')
			}
			deleteUrl={'api/sponsorship'}
			editUrl={'sponsorship/action/'}
			deleteTitle={'Sponsorship'}
			infoUrl={'sponsorship/'}
			action={actions}
		/>
	);
}
export default SponsorshipTable;
