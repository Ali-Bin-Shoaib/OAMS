import { GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import { Orphan } from '@prisma/client';
import AppHead from '../../../components/common/AppHead';
import { useEffect, useState } from 'react';
import OrphanCard from '../../../components/orphans/OrphanCard';
import OrphansTable from '../../../components/orphans/OrphansTable';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useRouter } from 'next/router';

// * get orphans from database and pass the result as props to Index page.
export const getStaticProps: GetStaticProps = async () => {
	const orphans = await prisma.orphan.findMany();
	orphans.sort(function (a, b) {
		return a.id > b.id ? 1 : -1;
	});
	const data = JSON.parse(JSON.stringify(orphans));

	return { props: { data }, revalidate: 10 };
};

export default function Index({ data }: { data: Orphan[] }) {
	const [orphans, setOrphans] = useState<Orphan[]>(data);
	const [cardInfo, setCardInfo] = useState<Orphan>(data[0]);
	const router = useRouter();
	const updateCard = (orphan: Orphan) => setCardInfo(orphan);

	useEffect(() => {
		setOrphans(data);
	}, [data]);

	return (
		<>
			<AppHead title='Orphans' />
			{orphans?.length === 0 ? <p className=''>No Orphan Registered </p> : <p>Registered Orphans: {orphans.length}</p>}
			<div className='text-center'>
				<Button size='md' onClick={() => router.push('/orphans/Create')}>
					<IconPlus />
					Add New Orphan
				</Button>
			</div>
			<OrphanCard orphan={cardInfo} />
			<OrphansTable orphans={orphans} updateCard={updateCard} />
		</>
	);
}
