import { GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import { useEffect, useState } from 'react';
import { Button, Loader } from '@mantine/core';
import SuperJSON from 'superjson';
import { EducationInfo, Orphan, User } from '@prisma/client';
import { useRouter } from 'next/router';
import { serverLink } from '../../../shared/links';
import { IconPlus } from '@tabler/icons-react';
import EducationTable from '../../../components/education/EducationTable';

// * get orphans from database and pass the result as props to Index page.
export const getStaticProps: GetStaticProps = async () => {
	const educationInfo = await prisma.educationInfo.findMany({
		include: { User: true, Orphan: true },
		orderBy: { id: 'asc' },
	});
	const stringJson = SuperJSON.stringify(educationInfo);
	return { props: { stringJson } };
};

interface Props {
	stringJson: string;
}
export default function Index({ stringJson }: Props) {
	console.log('Education Index');
	const education = SuperJSON.parse<(EducationInfo & { User: User; Orphan: Orphan })[]>(stringJson);
	console.log('🚀 ~ file: index.tsx:32 ~ Index ~ education:', education);
	const [hydration, setHydration] = useState(false);
	const router = useRouter();
	useEffect(() => {
		setHydration(true);
	}, [hydration, stringJson]);

	if (!hydration || !education) return <Loader size={100} />;
	return (
		<>
			<div className='text-center'>
				<Button size='xl' m={15} onClick={() => router.push(`${serverLink}education/create`)}>
					<IconPlus />
					Add new Education info
				</Button>
			</div>
			<EducationTable education={education} />
		</>
	);
}
