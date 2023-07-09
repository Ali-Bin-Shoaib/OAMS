import { Group, Paper, Text, Loader, SimpleGrid, Button, Tooltip, Title, Center } from '@mantine/core';
import { GetServerSideProps } from 'next';
import SuperJSON from 'superjson';
import prisma from '../../../lib/prisma';
import { useState, useEffect } from 'react';
import { IconEdit } from '@tabler/icons-react';
import router from 'next/router';
import DeleteModal from '../../../components/common/DeleteModal';
import { Pages, serverLink } from '../../../shared/links';
import { Education, _ActivityExecutionInfo } from '../../../types';
import Image from 'next/image';
import img from '../../img/3.jpg';
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const id = Number(params?.id);
	if (!id) return { notFound: true };
	const education = await prisma.educationInfo.findFirst({
		where: { id: id },
		include: {
			User: true,
			Orphan: true,
		},
		orderBy: { id: 'asc' },
	});

	if (!education) {
		return { notFound: true };
	}
	const data = education;
	const stringData = SuperJSON.stringify(data);
	return { props: { stringData } };
};

interface Props {
	stringData: string;
}
function Info({ stringData }: Props) {
	const [hydration, setHydration] = useState(false);
	const education: Education = SuperJSON.parse(stringData);
	useEffect(() => {
		setHydration(true);
	}, [hydration, stringData]);

	if (!hydration || !education) return <Loader size={100} />;
	return (
		<div style={{ margin: 'auto', maxWidth: 800 }}>
			<Group position='center' style={{ margin: 20 }}>
				<Title weight={700}>Education Info</Title>
				{/* add other components as needed */}
			</Group>
			{education ? (
				<Paper p={'xl'} shadow='sm' m={0} withBorder>
					<SimpleGrid cols={2} p={10}>
						<Text weight={700}>ID:</Text>
						<Text>{education.id}</Text>
						<Text weight={700}>Orphan Name:</Text>
						<Text>{education.Orphan.name}</Text>
						<Text weight={700}>Created by:</Text>
						<Text>{education.User.name}</Text>
						<Text weight={700}>Date:</Text>
						<Text>{education.date.toDateString()}</Text>
						<Text weight={700}>School Name:</Text>
						<Text>{education.Orphan.schoolName}</Text>
						<Text weight={700}>School Year:</Text>
						<Text>{education.schoolYear}</Text>
						<Text weight={700}>Degree:</Text>
						<Text>{education.degree}</Text>
						<Text weight={700}>Note:</Text>
						<Text>{education.note}</Text>
						<Text weight={700}>Score Sheet:</Text>
					</SimpleGrid>
					<Group position='right' p={10}>
						<Button.Group>
							<DeleteModal
								id={education.id!}
								title={'education'}
								url={'api/education/'}
								redirectUrl={`${serverLink}behavior`}
							/>
							<Tooltip label={'Edit'}>
								<Button
									size='xs'
									onClick={() => {
										router.push(`${Pages.EducationInfo.link}edit/${education.id}`);
									}}
									color='yellow'>
									<IconEdit />
								</Button>
							</Tooltip>
						</Button.Group>
					</Group>
					<Center>
						<Image
							src={education.scoreSheet ? URL.createObjectURL(education.scoreSheet) : img}
							width={500}
							height={300}
							className='hover:shadow-xl'
							alt={'ScoreSheet'}
						/>
					</Center>
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
