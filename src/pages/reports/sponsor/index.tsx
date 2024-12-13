import { Badge, Center, Select, Text } from '@mantine/core';
import { Orphan, Sponsor, Sponsorship, User } from '@prisma/client';
import SponsorTable from 'components/sponsors/SponsorTable';
import SponsorshipTable from 'components/sponsorships/SponsorshipTable';
import prisma from 'lib/prisma';
import { GetStaticProps } from 'next';
import { useCallback, useEffect, useState } from 'react';
import SuperJSON from 'superjson';
import { _Sponsor, _Sponsorship } from 'types';

export const getStaticProps: GetStaticProps = async () => {
	try {
		const sponsors = await prisma.sponsor.findMany({
			include: {
				user: { select: { id: true, name: true, gender: true, address: true, phone: true } },
				Sponsorship: { include: { Orphan: { select: { id: true, name: true, gender: true, evaluation: true } } } },
			},
		});
		const sponsorshipsCount = await prisma.sponsorship.count({ where: { isActive: true } });
		const sponsoredOrphans = await prisma.orphan.count({ where: { Sponsorship: { none: { isActive: true } } } });
		const orphansCount = await prisma.orphan.count();
		const data = { sponsors, sponsorshipsCount, orphansCount, sponsoredOrphans };
		const jsonData = SuperJSON.stringify(data);
		return { props: { jsonData } };
	} catch (error) {
		console.log('🚀 ~ file: index.tsx:15 ~ constgetStaticProps:GetStaticProps= ~ error:', error);
	}
	return { props: {} };
};
interface Props {
	jsonData: string;
}
interface JsonDataProps {
	sponsors: (Sponsor & {
		user: Pick<User, 'id' | 'name' | 'gender' | 'address' | 'phone'>;
		Sponsorship: (Sponsorship & { Orphan: Pick<Orphan, 'id' | 'name' | 'gender' | 'evaluation'> })[];
	})[];
	sponsorshipsCount: number;
	sponsoredOrphans: number;
	orphansCount: number;
}
function SponsorReportIndex({ jsonData }: Props) {
	const { sponsors, sponsorshipsCount, sponsoredOrphans, orphansCount } = SuperJSON.parse<JsonDataProps>(jsonData);
	const [selectedSponsor, setSelectedSponsor] = useState<JsonDataProps['sponsors'][0] | null>(null);
	console.log('🚀 ~ file: index.tsx:50 ~ SponsorReportIndex ~ selectedSponsor:', selectedSponsor);
	const [hydrated, setHydrated] = useState(false);

	const handleChange = useCallback(() => {
		selectedSponsor ? 555 : 5555;
	}, [, selectedSponsor]);

	useEffect(() => {
		handleChange();
		setHydrated(true);
	}, [selectedSponsor]);

	return (
		<>
			<div className='p-2 m-2 pt-5'>
				<div className='flex flex-wrap justify-around p-3'>
					<Select
						label='الكفلاء'
						description='اختر كفيل لعرض تفاصيل الكفالة'
						clearable
						m={5}
						searchable
						data={sponsors.map((x) => ({ label: x.user.name, value: x.userId.toString() }))}
						onChange={(e) => {
							e ? setSelectedSponsor(sponsors.filter((x) => x.userId === Number(e))[0]) : setSelectedSponsor(null);
						}}
					/>
				</div>

				<div className=' p-1'>
					<Center>
						<Badge size='xl' color='blue'>
							{new Date().toDateString()}
						</Badge>
					</Center>
				</div>
				<div className=' p-1'>
					<Center>
						<Badge size='lg' color='cyan'>
							<Text color='dark'>الكفلاء: {sponsors.length}</Text>
						</Badge>
						<Badge size='lg' color='cyan'>
							<Text color='dark'>الكفالات: {sponsorshipsCount}</Text>
						</Badge>
						<Badge size='lg' color='cyan'>
							<Text color='dark'>
								الأيتام المكفولين: {sponsoredOrphans} Of {orphansCount}
							</Text>
						</Badge>
					</Center>
				</div>
				<div></div>
				{selectedSponsor ? (
					<SponsorshipTable sponsorships={selectedSponsor.Sponsorship} actions={false} />
				) : (
					<SponsorTable sponsors={sponsors as unknown as _Sponsor[]} actions={false} />
				)}
			</div>
		</>
	);
}
export default SponsorReportIndex;
