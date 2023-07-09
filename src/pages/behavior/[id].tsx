import { Group, Paper, Text, Loader, SimpleGrid, Button, Tooltip, Title, Rating, Table } from '@mantine/core';
import { GetServerSideProps } from 'next';
import SuperJSON from 'superjson';
import prisma from '../../../lib/prisma';
import { User, BehaviorInfo, BehaviorCriteria, Criteria, Orphan } from '@prisma/client';
import { useState, useEffect } from 'react';
import { IconEdit } from '@tabler/icons-react';
import router from 'next/router';
import DeleteModal from '../../../components/common/DeleteModal';
import { Pages, serverLink } from '../../../shared/links';
import { _ActivityExecutionInfo } from '../../../types';
import { CalculateAverage } from '../../../utils/Calculation';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const id = Number(params?.id);
	if (!id) return { notFound: true };
	const behavior = await prisma.behaviorInfo.findFirst({
		where: { id: id },
		include: {
			User: true,
			BehaviorCriteria: { include: { Criteria: true } },
			Orphan: true,
		},
	});

	if (!behavior) {
		return { notFound: true };
	}
	const data = behavior;
	const stringData = SuperJSON.stringify(data);
	return { props: { stringData } };
};

interface Props {
	stringData: string;
}
type Behavior = BehaviorInfo & {
	User: User;
	BehaviorCriteria: (BehaviorCriteria & { Criteria: Criteria })[];
	Orphan: Orphan;
};
function Info({ stringData }: Props) {
	const [hydration, setHydration] = useState(false);
	const behavior: Behavior = SuperJSON.parse(stringData);
	useEffect(() => {
		setHydration(true);
	}, [hydration, stringData]);

	if (!hydration || !behavior) return <Loader size={100} />;
	return (
		<div style={{ margin: 'auto', maxWidth: 800 }}>
			<Group position='center' style={{ margin: 20 }}>
				<Title weight={700}>behavior Info</Title>
				{/* add other components as needed */}
			</Group>
			{behavior ? (
				<Paper p={'xl'} shadow='sm' m={0} withBorder>
					<SimpleGrid cols={2} p={10}>
						<Text weight={700}>ID:</Text>
						<Text>{behavior.id}</Text>
						<Text weight={700}>Orphan Name:</Text>
						<Text>{behavior.Orphan.name}</Text>
						<Text weight={700}>Created by:</Text>
						<Text>{behavior.User.name}</Text>
						<Text weight={700}>Date:</Text>
						<Text>{behavior.date.toDateString()}</Text>
						<Text weight={700}>Note:</Text>
						<Text>{behavior.note}</Text>
						<Text weight={700}>Total Evaluation:</Text>
						<Text>{CalculateAverage(behavior.BehaviorCriteria.map((x) => x.evaluation)).toFixed(2)}</Text>
					</SimpleGrid>
					<Table striped highlightOnHover withBorder p={10}>
						<thead>
							<tr>
								<th></th>
								<th>title</th>
								<th>evaluation</th>
							</tr>
						</thead>
						<tbody>
							{behavior.BehaviorCriteria.map((field, index) => (
								<tr key={field.id}>
									<td>
										<Text>{index + 1}</Text>
									</td>
									<td>
										<Text>{field.Criteria.title}</Text>
									</td>
									<td>
										<Rating placeholder='choose orphan' value={field.evaluation} readOnly />
									</td>
								</tr>
							))}
							{/* <tr>
									<td>
										<Button.Group>
											<ActionIcon></ActionIcon>
										</Button.Group>
									</td>
								</tr> */}
						</tbody>
					</Table>
					<Group position='right' p={10}>
						<Button.Group>
							<DeleteModal id={behavior.id!} title={'behavior'} url={'api/behavior/'} redirectUrl={`${serverLink}behavior`} />

							<Tooltip label={'Edit'}>
								<Button
									size='xs'
									onClick={() => {
										router.push(`${Pages.BehaviorInfo.link}edit/${behavior.id}`);
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
					Loading...
					<Loader />
				</Text>
			)}
		</div>
	);
}
export default Info;
