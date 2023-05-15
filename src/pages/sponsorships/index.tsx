import { GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import AppHead from '../../../components/common/AppHead';
import { useEffect, useState } from 'react';
import { Loader } from '@mantine/core';
import SuperJSON from 'superjson';
import { _Orphan, _Sponsor, _Sponsorship, _User } from '../../../types/types';
import { Orphan, Sponsor, Sponsorship, User } from '@prisma/client';
import { usePageTitle } from '../../../hooks/usePageTitle';
import MyModal from '../../../components/common/MyModal';
import { useDisclosure } from '@mantine/hooks';
import SponsorshipTable from '../../../components/sponsorships/SponsorshipTable';
import SponsorshipForm from '../../../components/sponsorships/SponsorshipForm';
// ******************************** SPONSORSHIP PAGE ********************************
// * get orphans from database and pass the result as props to Index page.
export const getStaticProps: GetStaticProps = async () => {
	// const users = await prisma.user.findMany({ where: { type: { notIn: ['SPONSOR', 'GUARDIAN'] } } });
	// const sponsorships = await prisma.sponsorship.findMany({ include: { Sponsor: true, Orphan: true } });
	const sponsorships = await prisma.sponsorship.findMany({
		include: { Sponsor: { include: { user: true } }, Orphan: true },
	});

	const sponsors = await prisma.sponsor.findMany({ include: { Sponsorship: true, user: true } });
	const orphans = await prisma.orphan.findMany({
		include: { Sponsorship: true },
		where: { Sponsorship: { every: { isActive: false } } },
	});
	if (sponsorships && orphans && sponsors) {
		sponsorships.sort(function (a, b) {
			return a.id > b.id ? 1 : -1;
		});
		orphans.sort(function (a, b) {
			return a.id > b.id ? 1 : -1;
		});
		sponsors.sort(function (a, b) {
			return a.id > b.id ? 1 : -1;
		});
		const data = { sponsors, orphans, sponsorships };
		const stringData = SuperJSON.stringify(data);
		return { props: { stringData } };
	}
	return { props: { undefined } };
};

export type Data = {
	sponsors: (Sponsor & { user: User; Sponsorship: Sponsorship[] })[];
	orphans: (Orphan & { Sponsorship: Sponsorship[] })[];
	// sponsorships: (Sponsorship & { Sponsor: Sponsor; Orphan: Orphan })[];
	sponsorships: (Sponsorship & { Orphan: Orphan; Sponsor: Sponsor & { user: User } })[];
};
interface Props {
	stringData: string;
}
export default function Index({ stringData }: Props) {
	console.log('SponsorshipsList Index');
	const jsonData: Data = SuperJSON.parse(stringData);
	const { sponsorships, orphans, sponsors } = jsonData;

	const [sponsorshipsList, setSponsorshipsList] = useState<Sponsorship[]>(sponsorships);
	const [cardInfo, setCardInfo] = useState<Sponsorship>(sponsorshipsList[0]);
	const [hydration, setHydration] = useState(false);
	const [opened, { open, close }] = useDisclosure(false);
	const title = usePageTitle();

	const updateCard = (sponsorship: Sponsorship) => setCardInfo(sponsorship);
	useEffect(() => {
		setSponsorshipsList(SuperJSON.parse(stringData));
		setHydration(true);
	}, [hydration, stringData]);

	if (!hydration || !jsonData) return <Loader size={100} />;
	return (
		<>
			<AppHead title={title} />
			<div className='text-center pb-4'>
				<MyModal
					modalTitle='Add Sponsorship'
					buttonText='Add New Sponsorship'
					close={close}
					open={open}
					opened={opened}
					ModelForm={<SponsorshipForm close={close} orphans={orphans} sponsors={sponsors as _Sponsor[]} />}
				/>
			</div>
			<SponsorshipTable sponsorships={sponsorships} updateCard={updateCard} />
		</>
	);
}
