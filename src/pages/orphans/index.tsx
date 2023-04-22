import { GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import { Orphan } from '@prisma/client';
import AppHead from '../../../components/common/AppHead';
import { useEffect, useState } from 'react';
import OrphanCard from '../../../components/orphans/OrphanCard';
import OrphansTable from '../../../components/orphans/OrphansTable';

// * get orphans from database and pass the result as props to Index page.
export const getStaticProps: GetStaticProps = async () => {
	const res = await prisma.orphan.findMany();
	const data = JSON.parse(JSON.stringify(res));
	return { props: { data }, revalidate: 10 };
};

export default function Index({ data }: { data: Orphan[] }) {
	const [orphans, setOrphans] = useState<Orphan[]>(data);
	const [cardInfo, setCardInfo] = useState<Orphan>(data[0]);
	const updateCard = (orphan: Orphan) => setCardInfo(orphan);

	useEffect(() => {
		setOrphans(data);
	}, [data]);

	return (
		<>
			<AppHead title='Orphans' />

			{orphans?.length === 0 ? (
				<p className=''>No Orphan Registered </p>
			) : (
				<p>Registered Orphans: {orphans.length}</p>
			)}
			<div>
				<OrphanCard orphan={cardInfo} />
				<OrphansTable orphans={orphans} updateCard={updateCard} />
			</div>
		</>
	);
}
