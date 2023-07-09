import { GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import AppHead from '../../../components/common/AppHead';
import { useEffect, useState } from 'react';
import OrphanCard from '../../../components/orphans/OrphanCard';
import OrphansTable from '../../../components/orphans/OrphansTable';
import { Flex, Loader, ScrollArea, Text } from '@mantine/core';
import SuperJSON from 'superjson';
import AddOrphanModal from '../../../components/orphans/modals/AddOrphanModal';
import { _Guardian, _Orphan, orphanWithGuardianAndSponsorshipInfo } from '../../../types';
import { Guardian, User } from '@prisma/client';
import { usePageTitle } from '../../../hooks/usePageTitle';
import { GuardianContext } from './contexts';
import { v4 } from 'uuid';
import { TableOfContents } from '../../../components/common/TableOfContents';
import { initial } from '../../../utils/CreateEntries';

// * get orphans from database and pass the result as props to Index page.
export const getStaticProps: GetStaticProps = async () => {
	try {
		await initial();
	} catch (error) {
		console.log('🚀 ~ file: index.tsx:23 ~ constgetStaticProps:GetStaticProps= ~ error:', error);
	}
	const orphans = await prisma.orphan.findMany({
		include: {
			Guardian: { include: { user: true } },
			Sponsorship: { include: { Sponsor: { include: { user: true } } }, where: { isActive: true } },
		},
		orderBy: { id: 'asc' },
	});
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
	// const jsonOrphans: _Orphan[] = SuperJSON.parse(stringData);
	// const jsonData = SuperJSON.parse<{ orphans: data[]; guardians: Guardian[] }>(stringData);
	const { orphans, guardians } = SuperJSON.parse<{
		orphans: orphanWithGuardianAndSponsorshipInfo[];
		guardians: (Guardian & {
			user: User;
		})[];
	}>(stringData);
	const [guardiansList, setGuardiansList] = useState<
		(Guardian & {
			user: User;
		})[]
	>(guardians);
	const [orphanList, setOrphanList] = useState<orphanWithGuardianAndSponsorshipInfo[]>(orphans);
	const [cardInfo, setCardInfo] = useState<orphanWithGuardianAndSponsorshipInfo>(orphans[0]);
	const [hydration, setHydration] = useState(false);
	const updateCard = (orphan: orphanWithGuardianAndSponsorshipInfo) => setCardInfo(orphan);
	const title = usePageTitle();
	useEffect(() => {
		const { orphans: newOrphans } = SuperJSON.parse<{
			orphans: orphanWithGuardianAndSponsorshipInfo[];
			guardians: Guardian[];
		}>(stringData);
		setOrphanList(newOrphans);
		updateCard(cardInfo);
		setHydration(true);
	}, [cardInfo, hydration, stringData]);

	if (!hydration) return <Loader size={100} />;
	return (
		<>
			<GuardianContext.Provider value={guardiansList}>
				<AppHead title={title} />
				<div className='text-center'>
					<AddOrphanModal />
				</div>

				<Flex wrap={'wrap'}>
					<ul style={{ height: '625px' }} className='border border-solid p-3 rounded-md m-3 '>
						<ScrollArea h={615} p={5}>
							{orphanList.map((orphan) => (
								<li
									className='hover:bg-slate-200 list-none py-3 p-1 rounded-md cursor-pointer'
									onClick={() => updateCard(orphan)}
									key={orphan.id}>
									<Text>{orphan.name}</Text>
								</li>
							))}
						</ScrollArea>
					</ul>
					<OrphanCard orphan={cardInfo} />
				</Flex>
			</GuardianContext.Provider>
			{/* <OrphansTable orphans={orphanList} updateCard={updateCard} /> */}
		</>
	);
}
