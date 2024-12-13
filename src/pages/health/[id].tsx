import { Group, Paper, Text, Loader, SimpleGrid, Button, Tooltip, Title, Center } from '@mantine/core';
import { GetServerSideProps } from 'next';
import SuperJSON from 'superjson';
import prisma from '../../../lib/prisma';
import { useState, useEffect } from 'react';
import { IconEdit } from '@tabler/icons-react';
import router from 'next/router';
import DeleteModal from '../../../components/common/DeleteModal';
import { Pages, serverLink } from '../../../shared/links';
import { Education, Health, _ActivityExecutionInfo } from '../../../types';
import Image from 'next/image';
import img from '../../img/3.jpg';
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const id = Number(params?.id);
	if (!id) return { notFound: true };
	const health = await prisma.healthInfo.findFirst({
		where: { id: id },
		include: {
			User: true,
			Orphan: true,
		},
		orderBy: { id: 'asc' },
	});

	if (!health) {
		return { props: {} };
	}
	const data = health;
	const stringData = SuperJSON.stringify(data);
	return { props: { stringData } };
};

interface Props {
	stringData: string;
}
function Info({ stringData }: Props) {
	const [hydration, setHydration] = useState(false);
	const health: Health = SuperJSON.parse(stringData);
	useEffect(() => {
		setHydration(true);
	}, [hydration, stringData]);

	if (!hydration) return <Loader size={100} />;
	return (
		<div style={{ margin: 'auto', maxWidth: 800 }}>
			<Group position='center' style={{ margin: 20 }}>
				<Title weight={700}>Health Info</Title>
				{/* add other components as needed */}
			</Group>
			{health ? (
				<Paper p={'xl'} shadow='sm' m={0} withBorder>
					<SimpleGrid cols={2} p={10}>
						<Text weight={700}>#:</Text>
						<Text>{health.id}</Text>
						<Text weight={700}>الاسم:</Text>
						<Text>{health.Orphan?.name}</Text>
						<Text weight={700}>بواسطة:</Text>
						<Text>{health.User?.name}</Text>
						<Text weight={700}>التاريخ:</Text>
						<Text>{health.date.toDateString()}</Text>
						<Text weight={700}>المرض:</Text>
						<Text>{health.disease}</Text>
						<Text weight={700}>الوصف:</Text>
						<Text>{health.description}</Text>
					</SimpleGrid>
					<Group position='right' p={10}>
						<Button.Group>
							<DeleteModal id={health.id!} title={'الحالة الصحية'} url={'api/health/'} redirectUrl={Pages.HealthInfo.link} />
							<Tooltip label={'تعديل'}>
								<Button
									size='xs'
									onClick={() => {
										router.push(`${Pages.HealthInfo.link}edit/${health.id}`);
									}}
									color='yellow'>
									<IconEdit />
								</Button>
							</Tooltip>
						</Button.Group>
					</Group>
				</Paper>
			) : (
				<Text>
					لا يوجد بيانات ... <Loader />
				</Text>
			)}
		</div>
	);
}
export default Info;
