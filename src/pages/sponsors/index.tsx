import { GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import { useEffect, useState } from 'react';
import { Button, Loader } from '@mantine/core';
import SuperJSON from 'superjson';
import { _Guardian, _Orphan, _Sponsor, _User } from '../../../types';
import SponsorTable from '../../../components/sponsors/SponsorTable';
import { IconPlus } from '@tabler/icons-react';
import router from 'next/router';
import { serverLink } from 'shared/links';

// * get sponsors from database and pass the result as props to Index page.
export const getStaticProps: GetStaticProps = async () => {
	const sponsor = await prisma.sponsor.findMany({ include: { user: true }, orderBy: { id: 'asc' } });
	const stringSponsor = SuperJSON.stringify(sponsor);
	return { props: { stringSponsor } };
};

interface Props {
	stringSponsor: string;
}
export default function Index({ stringSponsor }: Props) {
	console.log('SponsorList Index');
	const jsonSponsor: _Sponsor[] = SuperJSON.parse(stringSponsor);
	const [sponsors, setSponsors] = useState<_Sponsor[]>(jsonSponsor);
	const [hydration, setHydration] = useState(false);

	useEffect(() => {
		setSponsors(SuperJSON.parse(stringSponsor));
		setHydration(true);
	}, [hydration, stringSponsor]);

	if (!hydration || !jsonSponsor) return <Loader size={100} />;
	return (
		<>
			{/* TODO pass a component with props to parent component */}
			<div className='text-center'>
				<Button size='xl' m={15} onClick={() => router.push(`${serverLink}sponsors/action/create`)}>
					<IconPlus />
					أضف كفيل
				</Button>
			</div>
			<SponsorTable sponsors={sponsors} />
		</>
	);
}
