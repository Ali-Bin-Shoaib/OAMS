import { GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import AppHead from '../../../components/common/AppHead';
import { useEffect, useState } from 'react';
import OrphanCard from '../../../components/orphans/OrphanCard';
import OrphansTable from '../../../components/orphans/OrphansTable';
import { Loader } from '@mantine/core';
import SuperJSON from 'superjson';
import AddOrphanModal from '../../../components/orphans/modals/AddOrphanModal';
import { _Guardian, _Orphan } from '../../../types/types';
import { Guardian } from '@prisma/client';
import { usePageTitle } from '../../../hooks/usePageTitle';
import { GuardianContext } from './contexts';
import { initOrphans } from '../../../data/orphans';
// * get orphans from database and pass the result as props to Index page.
export const getStaticProps: GetStaticProps = async () => {
	(await prisma.orphan.count()) < 40 && (await prisma.orphan.createMany({ data: initOrphans }));

	const orphans = await prisma.orphan.findMany();
	const guardians = await prisma.guardian.findMany({ include: { user: true } });
	//* to use generated types from prisma client
	//* "no need to create new types for form inputs"
	// type Guardian = Prisma.UserGetPayload<{ include: { Guardian: true } }>;
	orphans.sort(function (a, b) {
		return a.id > b.id ? 1 : -1;
	});
	guardians.sort(function (a, b) {
		return a.id > b.id ? 1 : -1;
	});

	const stringData = SuperJSON.stringify({ orphans, guardians });
	return { props: { stringData } };
};
interface Props {
	stringData: string;
}

export default function Index({ stringData }: Props) {
	console.log('OrphanList Index');
	const jsonOrphans: _Orphan[] = SuperJSON.parse(stringData);
	const jsonData = SuperJSON.parse<{ orphans: _Orphan[]; guardians: Guardian[] }>(stringData);
	const { orphans, guardians } = SuperJSON.parse<{ orphans: _Orphan[]; guardians: _Guardian[] }>(stringData);
	const [orphanList, setOrphanList] = useState<_Orphan[]>(orphans);
	const [cardInfo, setCardInfo] = useState<_Orphan>(orphans[0]);
	const [hydration, setHydration] = useState(false);
	const updateCard = (orphan: _Orphan) => setCardInfo(orphan);
	const title = usePageTitle();
	useEffect(() => {
		setOrphanList(SuperJSON.parse(stringData));
		updateCard(cardInfo);
		setHydration(true);
	}, [cardInfo, hydration, stringData]);

	if (!hydration || !jsonOrphans) return <Loader size={100} />;
	return (
		<>
			<AppHead title={title} />
			<GuardianContext.Provider value={guardians}>
				<div className='text-center'>
					<AddOrphanModal />
				</div>
				<OrphanCard orphan={cardInfo} />
			</GuardianContext.Provider>
			<OrphansTable orphans={orphans} updateCard={updateCard} />
		</>
	);
}
