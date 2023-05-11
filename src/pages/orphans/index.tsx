import { GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import AppHead from '../../../components/common/AppHead';
import { useEffect, useState } from 'react';
import OrphanCard from '../../../components/orphans/OrphanCard';
import OrphansTable from '../../../components/orphans/OrphansTable';
import { Loader } from '@mantine/core';
import SuperJSON from 'superjson';
import AddOrphanModal from '../../../components/orphans/modals/AddOrphanModal';
import { _Orphan } from '../../../types/types';
import { Orphan, Prisma } from '@prisma/client';
import { usePageTitle } from '../../../hooks/usePageTitle';

// * get orphans from database and pass the result as props to Index page.
export const getStaticProps: GetStaticProps = async () => {
	const orphans = await prisma.orphan.findMany();
	//* to use generated types from prisma client
	//* "no need to create new types for form inputs"
	// type Guardian = Prisma.UserGetPayload<{ include: { Guardian: true } }>;
	orphans.sort(function (a, b) {
		return a.id > b.id ? 1 : -1;
	});
	const stringOrphans = SuperJSON.stringify(orphans);
	return { props: { stringOrphans } };
};

interface Props {
	stringOrphans: string;
}
export default function Index({ stringOrphans }: Props) {
	console.log('OrphanList Index');
	const jsonOrphans: _Orphan[] = SuperJSON.parse(stringOrphans);
	const [orphans, setOrphans] = useState<_Orphan[]>(jsonOrphans);
	const [cardInfo, setCardInfo] = useState<_Orphan>(jsonOrphans[0]);
	const [hydration, setHydration] = useState(false);
	const updateCard = (orphan: _Orphan) => setCardInfo(orphan);
	const title = usePageTitle();
	useEffect(() => {
		setOrphans(SuperJSON.parse(stringOrphans));
		updateCard(cardInfo);
		setHydration(true);
	}, [cardInfo, hydration, stringOrphans]);

	if (!hydration || !jsonOrphans) return <Loader size={100} />;
	return (
		<>
			<AppHead title={title} />
			<div className='text-center'>
				<AddOrphanModal />
			</div>
			<OrphanCard orphan={cardInfo as unknown as Orphan} />
			<OrphansTable orphans={orphans} updateCard={updateCard} />
		</>
	);
}
