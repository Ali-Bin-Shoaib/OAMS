import { Orphan, Prisma, Sponsor, Sponsorship, User } from '@prisma/client';
import { useMemo } from 'react';
import { MRT_ColumnDef, MantineReactTable } from 'mantine-react-table';
import { Button, Container, Tooltip } from '@mantine/core';
import { _Sponsor } from '../../types';
import { IconEdit } from '@tabler/icons-react';
import DeleteModal from 'components/common/DeleteModal';
import router from 'next/router';
import { serverLink } from 'shared/links';
import MyModal from 'components/common/MyModal';
import orphans from 'src/pages/orphans';
import sponsors from 'src/pages/sponsors';
import SponsorshipForm from './SponsorshipForm';

interface Props {
	sponsorships: (Sponsorship & { Sponsor: Sponsor & { user: User }; Orphan: Orphan })[];
	orphans: Orphan[];
	sponsors: _Sponsor[];
}

function SponsorshipTable({ sponsorships, orphans, sponsors }: Props) {
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
				accessorFn: (row) => (row.isActive ? 'yes' : 'no'),
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
		<Container fluid>
			<MantineReactTable
				columns={columns}
				data={sponsorships}
				initialState={{ density: 'xs' }}
				enableColumnResizing
				displayColumnDefOptions={{ 'mrt-row-actions': { size: 100 } }}
				enableRowActions
				renderRowActions={({ row }) => {
					return (
						<Button.Group>
							<DeleteModal id={row.original.id!} title={'Sponsorship'} url={'api/sponsorship/'} />
							<MyModal
								modalTitle='Add Sponsorship'
								icon={<IconEdit />}
								modalSize='calc(100vw - 3rem)'
								size='xs'
								buttonColor='yellow'
								m={0}
								disabled={true}
								// close={close}
								// open={open}
								// opened={opened}
								ModelForm={<SponsorshipForm close={close} orphans={orphans} sponsors={sponsors as _Sponsor[]} />}
							/>

							{/* <Tooltip label={'Edit'}>
								<Button
									size='xs'
									onClick={() => {
										router.push(serverLink + 'sponsorship/action/' + row.original.userId);
									}}
									color='yellow'>
									<IconEdit />
								</Button>
							</Tooltip> */}
						</Button.Group>
					);
				}}
				// mantineTableBodyRowProps={({ row }) => ({
				// 	onClick: () => {
				// 		updateCard(row.original);
				// 	},
				// 	sx: { border: '2px solid #dee2e6' },
				// })}
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
