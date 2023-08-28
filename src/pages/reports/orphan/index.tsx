import { Badge, Center, Select } from '@mantine/core';
import {
	BehaviorCriteria,
	BehaviorInfo,
	EducationInfo,
	Orphan,
	OrphanActivityExecution,
	OrphanAttendance,
} from '@prisma/client';
import prisma from 'lib/prisma';
import { GetStaticProps } from 'next';
import { useCallback, useEffect, useState } from 'react';
import SuperJSON from 'superjson';
import OrphansTable from 'components/orphans/OrphansTable';
export const getStaticProps: GetStaticProps = async () => {
	try {
		const orphans = await prisma.orphan.findMany({
			select: {
				id: true,
				name: true,
				evaluation: true,
				BehaviorInfo: { select: { BehaviorCriteria: { select: { evaluation: true } } } },
				EducationInfo: { select: { degree: true } },
				OrphanAttendance: { select: { isAttended: true } },
				OrphanActivityExecution: { select: { isAttended: true, evaluation: true } },
			},
			orderBy: { id: 'asc' },
		});
		const data = { orphans };
		const jsonData = SuperJSON.stringify(data);

		return { props: { jsonData } };
	} catch (error) {
		return { props: {} };
	}
};
interface JsonDataProps {
	orphans: (Pick<Orphan, 'id' | 'name' | 'evaluation'> & {
		BehaviorInfo: BehaviorInfo & { BehaviorCriteria: Pick<BehaviorCriteria, 'evaluation'>[] }[];
		EducationInfo: Pick<EducationInfo, 'degree'>[];
		OrphanAttendance: Pick<OrphanAttendance, 'isAttended'>[];
		OrphanActivityExecution: Pick<OrphanActivityExecution, 'isAttended' | 'evaluation'>[];
	})[];
}
interface Props {
	jsonData: string;
}
function OrphanReportIndex({ jsonData }: Props) {
	const { orphans }: JsonDataProps = SuperJSON.parse<JsonDataProps>(jsonData);

	const [hydrated, setHydrated] = useState(false);
	const [selectedOrphan, setSelectedOrphan] = useState<number | null>(null);
	const [filteredOrphans, setFilteredOrphans] = useState<typeof orphans>(orphans);

	const handleChange = useCallback(() => {
		console.log('🚀 orphanId:', selectedOrphan);
		selectedOrphan ? setFilteredOrphans(orphans.filter((x) => x.id === selectedOrphan)) : setFilteredOrphans(orphans);
	}, [, selectedOrphan]);

	useEffect(() => {
		handleChange();
		setHydrated(true);
	}, [selectedOrphan]);
	if (!hydrated) return;
	return (
		<>
			<div className='p-2 m-2 pt-5'>
				<div className='flex flex-wrap justify-center p-3'>
					<Select
						label='Orphans'
						description='select orphan to show his activity executions'
						clearable
						m={5}
						searchable
						data={orphans.map((x) => ({ label: x.name, value: x.id.toString() }))}
						onChange={(e) => {
							e ? setSelectedOrphan(orphans.filter((x) => x.id === Number(e))[0].id) : setSelectedOrphan(null);
						}}
					/>
				</div>

				<div className=' p-1'>
					<Center>
						<Badge size='xl' color='dark'>
							{new Date().toDateString()}
						</Badge>
					</Center>
				</div>
				<OrphansTable orphans={filteredOrphans} />
			</div>
		</>
	);
}
export default OrphanReportIndex;
