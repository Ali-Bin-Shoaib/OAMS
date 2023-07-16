import { GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import { useEffect, useState } from 'react';
import OrphanCard from '../../../components/orphans/OrphanCard';
import {
	Card,
	Divider,
	Flex,
	List,
	Loader,
	ScrollArea,
	Text,
	TextInput,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import SuperJSON from 'superjson';
import AddOrphanModal from '../../../components/orphans/modals/AddOrphanModal';
import { _Guardian, _Orphan, orphanWithGuardianAndSponsorshipInfo } from '../../../types';
import { Guardian, User } from '@prisma/client';
import { GuardianContext } from '../../../shared/contexts';
import { initial } from '../../../utils/CreateEntries';
import { v4 } from 'uuid';
import img from '../../img/3.jpg';
import ListComponent, { ListItemComponent } from '../../../components/common/ListComponent';
import { IconSearch } from '@tabler/icons-react';

// * get orphans from database and pass the result as props to Index page.
export const getStaticProps: GetStaticProps = async () => {
	try {
		await initial();
	} catch (error) {
		console.log('🚀 ~ file: index.tsx:23 ~ constgetStaticProps:GetStaticProps= ~ error:', error);
		throw new Error(`getStaticProps catch${error}`);
	}
	const orphans = await prisma.orphan.findMany({
		include: {
			Guardian: { select: { user: { select: { id: true, name: true } } } },
			Sponsorship: {
				include: { Sponsor: { select: { user: { select: { id: true, name: true } } } } },
				where: { isActive: true },
			},
		},
		orderBy: { id: 'asc' },
	});
	const guardians = await prisma.guardian.findMany({
		select: { user: { select: { id: true, name: true } } },
		orderBy: { id: 'asc' },
	});
	console.log('🚀 ~ file: index.tsx:49 ~ constgetStaticProps:GetStaticProps= ~ guardians:', guardians);
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
		guardians: { user: { id: number; name: string } }[];
	}>(stringData);
	const [guardiansList, setGuardiansList] = useState<{ user: { id: number; name: string } }[]>(guardians);
	const { colorScheme } = useMantineColorScheme();
	const theme = useMantineTheme();
	const [orphanList, setOrphanList] = useState<orphanWithGuardianAndSponsorshipInfo[]>(orphans);
	const [cardInfo, setCardInfo] = useState<orphanWithGuardianAndSponsorshipInfo>(orphans[0]);
	const [search, setSearch] = useState<string>('');
	const [hydration, setHydration] = useState(false);
	const updateCard = (orphan: orphanWithGuardianAndSponsorshipInfo) => setCardInfo(orphan);
	useEffect(() => {
		const { orphans: newOrphans, guardians: newGuardians } = SuperJSON.parse<{
			orphans: orphanWithGuardianAndSponsorshipInfo[];
			guardians: { user: { id: number; name: string } }[];
		}>(stringData);
		setOrphanList(newOrphans);
		setGuardiansList(newGuardians);
		updateCard(cardInfo);
		setHydration(true);
	}, [cardInfo, hydration, stringData]);

	if (!hydration) return <Loader size={100} />;
	return (
		<>
			<GuardianContext.Provider value={guardiansList}>
				<Flex wrap={'wrap'} className='p-1.5 '>
					<ListComponent>
						<TextInput
							className='my-2 mr-1'
							placeholder='Search'
							size='lg'
							icon={<IconSearch />}
							onChange={(e) => {
								console.log('🚀 ~ file: index.tsx:99 ~ Index ~ e:', e.target.value);
								setSearch(e.target.value);
							}}
						/>
						<Divider p={2} />
						<ScrollArea h={500} p={5}>
							{orphanList
								.filter((x) => x.name.includes(search))
								.map((orphan) => (
									<ListItemComponent
										key={orphan.id}
										id={orphan.id}
										img={orphan.image || img}
										title={orphan.name}
										leftData={{ label: 'age', data: orphan.age }}
										middleData={{ label: 'gender', data: orphan.gender }}
										rightData={{ label: 'rating', data: orphan.evaluation || 3 }}
										onClick={() => updateCard(orphan)}
									/>
								))}
						</ScrollArea>
					</ListComponent>
					<Card key={v4()} withBorder shadow='xs' radius='md' className=' mx-auto my-2  w-1/2 min-w-min '>
						<OrphanCard orphan={cardInfo} />
					</Card>
				</Flex>
				<div className='text-center'>
					<AddOrphanModal />
				</div>
			</GuardianContext.Provider>
			{/* <OrphansTable orphans={orphanList} updateCard={updateCard} /> */}
		</>
	);
}
