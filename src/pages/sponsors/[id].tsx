import { Group, Paper, Text, Loader, SimpleGrid, Button, Tooltip } from '@mantine/core';
import { GetServerSideProps } from 'next';
import SuperJSON from 'superjson';
import prisma from '../../../lib/prisma';
import { User, Sponsor } from '@prisma/client';
import { useState, useEffect } from 'react';
import { IconEdit } from '@tabler/icons-react';
import router from 'next/router';
import DeleteModal from '../../../components/common/DeleteModal';
import { Pages } from '../../../shared/links';
import { _ActivityExecutionInfo } from '../../../types';
import InfoComponent from 'components/common/infoComponent';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const id = Number(params?.id);
	console.log('🚀 ~ file: [id].tsx:16 ~ constgetServerSideProps:GetServerSideProps= ~ id:', id);
	try {
		const sponsor = await prisma.sponsor.findFirst({
			where: { userId: id },
			include: { user: true },
		});
		console.log('🚀 ~ file: [id].tsx:22 ~ constgetServerSideProps:GetServerSideProps= ~ sponsor:', sponsor);

		if (!sponsor) {
			return { notFound: true };
		}
		const data = { sponsor };
		const stringData = SuperJSON.stringify(data);
		return { props: { stringData } };
	} catch (error) {
		console.log('🚀 ~ file: [id].tsx:36 ~ constgetServerSideProps:GetServerSideProps= ~ error:', error);
		return { props: {} };
	}
};

interface Props {
	stringData: string;
}
function Info({ stringData }: Props) {
	const [hydration, setHydration] = useState(false);
	const jsonData: {
		sponsor: Sponsor & {
			user: User;
		};
	} = SuperJSON.parse(stringData);
	const { sponsor } = jsonData;
	useEffect(() => {
		setHydration(true);
	}, [hydration, stringData]);

	if (!hydration || !jsonData) return <Loader size={100} />;
	return (
		<div style={{ margin: 'auto', maxWidth: 800 }}>
			{/* <h1 className='text-center shadow p-2 bg-slate-50'>Sponsor Info</h1> */}
			{/* add other components as needed */}
			{sponsor ? (
				<Paper p={'xl'} withBorder className='hover:shadow-md' m={40}>
					<InfoComponent
						data={[
							{ label: 'ID', value: sponsor.userId },
							{ label: 'Name', value: sponsor.user.name },
							{ label: 'Gender', value: sponsor.user.gender },
							{ label: 'ID Number', value: sponsor.identityNumber },
							{ label: 'Birth Date', value: sponsor.birthdate?.toDateString() },
							{ label: 'Address', value: sponsor.user.address },
							{ label: 'Email', value: sponsor.user.email },
							{ label: 'Phone', value: sponsor.user.phone },
							{ label: 'Fax', value: sponsor.fax },
						]}
						title='Sponsor Info'
					/>
					{/* <SimpleGrid cols={2}>
						<Text weight={700}>ID:</Text>
						<Text>{sponsor.userId}</Text>
						<Text weight={700}>Name:</Text>
						<Text>{sponsor.user.name}</Text>
						<Text weight={700}>Gender:</Text>
						<Text>{sponsor.user.gender}</Text>
						<Text weight={700}>ID Number:</Text>
						<Text>{sponsor.identityNumber}</Text>
						<Text weight={700}>Birth Date:</Text>
						<Text>{sponsor.birthdate?.toDateString()}</Text>
						<Text weight={700}>Address:</Text>
						<Text>{sponsor.user.address}</Text>
						<Text weight={700}>Email:</Text>
						<Text>{sponsor.user.email}</Text>
						<Text weight={700}>Phone:</Text>
						<Text>{sponsor.user.phone}</Text>
						<Text weight={700}>Fax:</Text>
						<Text>{sponsor.fax}</Text>
					</SimpleGrid> */}
					<Group position='right'>
						<Button.Group>
							<DeleteModal id={sponsor.userId} title={'Sponsor'} url={'api/user/'} redirectUrl={Pages.Sponsors.link} />
							<Tooltip label={'Edit'}>
								<Button
									size='xs'
									onClick={() => {
										router.push(`${Pages.Sponsors.link}action/${sponsor.userId}`);
									}}
									color='yellow'>
									<IconEdit />
								</Button>
							</Tooltip>
						</Button.Group>
					</Group>
				</Paper>
			) : (
				<Text>Loading...</Text>
			)}
		</div>
	);
}
export default Info;
