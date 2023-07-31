import { GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import { UserType } from '@prisma/client';
import { useEffect, useState } from 'react';
import { Button, Loader, Tooltip } from '@mantine/core';
import SuperJSON from 'superjson';
import { _Guardian, _Orphan, _Sponsor, _User } from '../../../types';
import MyModal from '../../../components/common/MyModal';
import { useDisclosure } from '@mantine/hooks';
import UserForm from '../../../components/users/UserForm';
// import { generateDumpData } from '../../../data/functions';
import SponsorTable from '../../../components/sponsors/SponsorTable';
import { IconPlus } from '@tabler/icons-react';
import router from 'next/router';
import { serverLink } from 'shared/links';

// * get orphans from database and pass the result as props to Index page.
export const getStaticProps: GetStaticProps = async () => {
	// const guardians = await prisma.user.findMany({ where: { type: { equals: 'GUARDIAN' } }, include: { Guardian: true } });
	const sponsor = await prisma.sponsor.findMany({ include: { user: true } });
	if (sponsor.length > 0) {
		sponsor.sort(function (a, b) {
			return a.id > b.id ? 1 : -1;
		});
	}
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
	const [cardInfo, setCardInfo] = useState<_Sponsor>(jsonSponsor[0]);
	const [hydration, setHydration] = useState(false);
	const [opened, { open, close }] = useDisclosure(false);

	const updateCard = (sponsor: _Sponsor) => setCardInfo(sponsor);
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
					Add Sponsor
				</Button>
			</div>
			<SponsorTable sponsors={sponsors} />
		</>
	);
}
