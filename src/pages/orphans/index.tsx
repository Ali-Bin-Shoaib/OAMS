import { GetStaticProps, GetStaticPropsContext } from 'next';
import prisma from '../../../lib/prisma';
import { useCallback, useEffect, useState } from 'react';
import MyCard from '../../../components/orphans/MyCard';
import { Button, Card, Divider, Flex, Loader, ScrollArea, Skeleton, TextInput } from '@mantine/core';
import SuperJSON from 'superjson';
import { ResponseType, _Guardian, _Orphan, orphanWithGuardianAndSponsorshipInfo } from '../../../types';
import { initial } from '../../../utils/CreateEntries';
import { v4 } from 'uuid';
import img from '../../img/3.jpg';
import ListComponent, { ListItemComponent } from '../../../components/common/ListComponent';
import { IconSearch, IconUserPlus } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { serverLink } from 'shared/links';
import { useSession } from 'next-auth/react';
import { Orphan, User } from '@prisma/client';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

// * get orphans from database and pass the result as props to Index page.
export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
	try {
		await initial();
	} catch (error) {
		console.log('🚀 ~ file: index.tsx:23 ~ constgetStaticProps:GetStaticProps= ~ error:', error);
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
	const stringData = SuperJSON.stringify({ orphans });
	return { props: { stringData } };
};

interface Props {
	stringData: string;
}
interface StringDataProps {
	orphans: orphanWithGuardianAndSponsorshipInfo[];
}
export default function Index({ stringData }: Props) {
	console.log('OrphanList Index');
	const { orphans } = SuperJSON.parse<StringDataProps>(stringData);
	const [orphanList, setOrphanList] = useState<orphanWithGuardianAndSponsorshipInfo[]>(orphans);
	const [cardInfo, setCardInfo] = useState<orphanWithGuardianAndSponsorshipInfo>(orphans[0]);
	const [search, setSearch] = useState<string>('');
	const router = useRouter();
	//! to show image  const src = URL.createObjectURL(image);
	const [hydration, setHydration] = useState(false);
	const updateCard = (orphan: orphanWithGuardianAndSponsorshipInfo) => setCardInfo(orphan);
	useEffect(() => {
		const { orphans: newOrphans } = SuperJSON.parse<StringDataProps>(stringData);
		setOrphanList(newOrphans);
		updateCard(cardInfo);
		setHydration(true);
	}, [cardInfo, hydration, stringData]);
	if (!hydration) return <Loader size={100} />;
	return (
		<>
			<Flex wrap={'wrap'} className='p-1.5 '>
				<ListComponent>
					<TextInput
						className='my-2 mr-1 bg-gray-900'
						placeholder='Search'
						size='lg'
						icon={<IconSearch />}
						onChange={(e) => {
							setSearch(e.target.value.toLowerCase());
						}}
					/>
					<Divider p={2} />
					<ScrollArea h={480} p={5}>
						{orphans
							.filter((x) => x.name.toLowerCase().includes(search))
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
				{/* {<OrphanCard orphan={cardInfo} />} */}
				{<MyCard orphan={cardInfo} />}
			</Flex>
			<div className='text-center'>
				{/* <AddOrphanModal /> */}
				{/* <Button
					className='btn btn1'
					size='xl'
					leftIcon={<IconUserPlus />}
					onClick={() => router.push(`${serverLink}orphans/action/create`)}>
					Add Orphan
				</Button> */}
			</div>
			{/* <OrphansTable orphans={orphanList} updateCard={updateCard} /> */}
		</>
	);
}
