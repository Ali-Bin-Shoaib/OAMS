import { GetStaticProps, GetStaticPropsContext } from 'next';
import prisma from '../../../lib/prisma';
import { useEffect, useState } from 'react';
import MyCard from '../../../components/orphans/MyCard';
import { Divider, Flex, Loader, TextInput } from '@mantine/core';
import SuperJSON from 'superjson';
import { _Guardian, _Orphan, orphanWithGuardianAndSponsorshipInfo } from '../../../types';
import { initial } from '../../../utils/CreateEntries';
import img from '../../img/3.jpg';
import ListComponent, { ListItemComponent } from '../../../components/common/ListComponent';
import { IconSearch } from '@tabler/icons-react';

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
								rightData={{ label: 'rating', data: orphan.evaluation || 0 }}
								onClick={() => updateCard(orphan)}
							/>
						))}
				</ListComponent>
				{<MyCard orphan={cardInfo} />}
			</Flex>
			<div className='text-center'></div>
		</>
	);
}
