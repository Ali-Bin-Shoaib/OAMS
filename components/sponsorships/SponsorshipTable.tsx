import { Orphan, Prisma, Sponsor, Sponsorship, User } from '@prisma/client';
import { useMemo } from 'react';
import { MRT_ColumnDef, MantineReactTable } from 'mantine-react-table';
import { Container } from '@mantine/core';
import { _Sponsor } from '../../types/types';

interface Props {
	sponsorships: (Sponsorship & { Sponsor: Sponsor & { user: User }; Orphan: Orphan })[];
	updateCard(sponsorship: Sponsorship): void;
}

function SponsorshipTable({ sponsorships, updateCard }: Props) {
	const columns = useMemo<MRT_ColumnDef<Sponsorship & { Sponsor: Sponsor & { user: User }; Orphan: Orphan }>[]>(
		() => [
			{
				accessorFn: (row) => row.id,
				id: 'id',
				header: 'id',
				maxSize: 300,
				minSize: 80,
				size: 80,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.Sponsor.user.name,
				id: 'Sponsor.user.name',
				header: 'Sponsor name',
				maxSize: 300,
				minSize: 80,
				size: 80,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.Orphan.name,
				id: 'Orphan.name',
				header: 'Orphan name',
				maxSize: 300,
				minSize: 80,
				size: 80,
				enableResizing: true,
			},
			// {
			// 	accessorFn: (row) => row.createdAt.toDateString(),
			// 	id: 'createdAt',
			// 	header: 'createdAt',
			// 	maxSize: 300,
			// 	minSize: 80,
			// 	size: 150,
			// 	enableResizing: true,
			// },
			{
				accessorFn: (row) => row.startDate.toDateString(),
				id: 'startDate',
				header: 'startDate',
				maxSize: 300,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.endDate.toDateString(),
				id: 'endDate',
				header: 'endDate',
				maxSize: 300,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.paymentMethod,
				id: 'paymentMethod',
				header: 'paymentMethod',
				maxSize: 300,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.sponsorshipPeriod,
				id: 'sponsorshipPeriod',
				header: 'sponsorshipPeriod',
				maxSize: 300,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => (row.isActive ? 'yes' : 'no'),
				id: 'isActive',
				header: 'isActive',
				maxSize: 300,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
		],
		[]
	);

	return (
		<Container fluid>
			<MantineReactTable
				columns={columns}
				data={sponsorships}
				initialState={{ density: 'xs' }}
				enableColumnResizing
				mantineTableBodyRowProps={({ row }) => ({
					onClick: () => {
						updateCard(row.original);
					},
					sx: { border: '2px solid #dee2e6' },
				})}
				mantineTableBodyCellProps={{
					sx: { border: '2px solid #dee2e6' },
				}}
				mantineTableHeadCellProps={{
					sx: { border: '2px solid #dee2e6' },
				}}
				mantineTableProps={{
					striped: true,
					sx: { border: '2px solid #dee2e6', tableLayout: 'fixed' },
				}}
			/>
		</Container>
	);
}
export default SponsorshipTable;
