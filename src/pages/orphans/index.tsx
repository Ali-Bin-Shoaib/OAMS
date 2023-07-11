import { GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import { useEffect, useState } from 'react';
import OrphanCard from '../../../components/orphans/OrphanCard';
import { Card, Flex, List, Loader, ScrollArea, Text } from '@mantine/core';
import SuperJSON from 'superjson';
import AddOrphanModal from '../../../components/orphans/modals/AddOrphanModal';
import { _Guardian, _Orphan, orphanWithGuardianAndSponsorshipInfo } from '../../../types';
import { Guardian, User } from '@prisma/client';
import { GuardianContext } from '../../../shared/contexts';
import { initial } from '../../../utils/CreateEntries';
import { v4 } from 'uuid';

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
				<div className='text-center'>
					<AddOrphanModal />
				</div>

				<Flex wrap={'wrap'}>
					<List h={'50%'} w={'13%'} className='border border-solid border-gray-300 p-3 rounded-md m-3 '>
						<ScrollArea h={615} p={5}>
							{orphanList.map((orphan) => (
								<List.Item
									className='hover:bg-slate-200 list-none py-3 p-1 rounded-md cursor-pointer'
									onClick={() => updateCard(orphan)}
									key={orphan.id}>
									<Text>{orphan.name}</Text>
								</List.Item>
							))}
						</ScrollArea>
					</List>
					<Card
						key={v4()}
						withBorder
						h={'60%'}
						w={'20%'}
						shadow='md'
						radius='md'
						padding='md'
						className=' mx-auto my-2 p-2 w-5/6'>
						<OrphanCard orphan={cardInfo} />
					</Card>
				</Flex>
			</GuardianContext.Provider>
			{/* <OrphansTable orphans={orphanList} updateCard={updateCard} /> */}
		</>
	);
}
