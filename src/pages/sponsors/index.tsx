import { GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import { UserType } from '@prisma/client';
import AppHead from '../../../components/common/AppHead';
import { useEffect, useState } from 'react';
import { Loader } from '@mantine/core';
import SuperJSON from 'superjson';
import { _Guardian, _Orphan, _Sponsor, _User } from '../../../types/types';
import MyModal from '../../../components/common/MyModal';
import { usePageTitle } from '../../../hooks/usePageTitle';
import { useDisclosure } from '@mantine/hooks';
import UserForm from '../../../components/users/UserForm';
import GuardianTable from '../../../components/guardians/GuardianTable';
import { generateDumpData } from '../../../data/functions';
import SponsorTable from '../../../components/sponsors/SponsorTable';

// * get orphans from database and pass the result as props to Index page.
export const getStaticProps: GetStaticProps = async () => {
	// const guardians = await prisma.user.findMany({ where: { type: { equals: 'GUARDIAN' } }, include: { Guardian: true } });
	const sponsor = await prisma.sponsor.findMany({ include: { user: true } });

	// generateDumpData(UserType.SPONSOR, 3);
	if (sponsor.length > -1) {
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
	const title = usePageTitle();
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
			<AppHead title={title} />
			<div className='text-center'>
				<MyModal
					ModelForm={<UserForm userType={UserType.SPONSOR} close={close} />}
					modalTitle={'Add Sponsor info'}
					buttonText={'Add New Sponsor'}
					open={open}
					close={close}
					opened={opened}
				/>
			</div>
			{/* <OrphanCard orphan={cardInfo as unknown as Orphan} /> */}
			<SponsorTable sponsors={sponsors} updateCard={updateCard} />
		</>
	);
}