import { GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import { Orphan } from '@prisma/client';
import AppHead from '../../../components/common/AppHead';
import { useEffect, useState } from 'react';
import OrphanCard from '../../../components/orphans/OrphanCard';
import OrphansTable from '../../../components/orphans/OrphansTable';
import { Loader } from '@mantine/core';
import { useRouter } from 'next/router';
import SuperJSON from 'superjson';
import AddOrphanModal from '../../../components/orphans/modals/AddOrphanModal';
// * get orphans from database and pass the result as props to Index page.
export const getStaticProps: GetStaticProps = async () => {
	const orphans = await prisma.orphan.findMany();

	orphans.sort(function (a, b) {
		return a.id > b.id ? 1 : -1;
	});
	const stringOrphans = SuperJSON.stringify(orphans);

	// return { props: { stringOrphans }, revalidate: 10 };
	return { props: { stringOrphans } };
};
interface Props {
	stringOrphans: string;
}
export default function Index({ stringOrphans }: Props) {
	console.log('OrphanList Index');

	const jsonOrphans: Orphan[] = SuperJSON.parse(stringOrphans);
	const router = useRouter();
	const [orphans, setOrphans] = useState<Orphan[]>(jsonOrphans);
	const [cardInfo, setCardInfo] = useState<Orphan>(jsonOrphans[0]);
	const [hydration, setHydration] = useState(false);

	const updateCard = (orphan: Orphan) => setCardInfo(orphan);

	useEffect(() => {
		setOrphans(SuperJSON.parse(stringOrphans));
		setHydration(true);
	}, [hydration, stringOrphans]);

	if (!hydration) return <Loader size={100} />;
	if (!jsonOrphans) return <Loader size={100} />;
	return (
		<>
			<AppHead title='Orphans' />

			<div className='text-center'>
				<AddOrphanModal />
			</div>
			<OrphanCard orphan={cardInfo} />
			<OrphansTable orphans={orphans} updateCard={updateCard} />
		</>
	);
}
