import { IconReport } from '@tabler/icons-react';
import MyCard from 'components/common/MyCard';
import { serverLink } from 'shared/links';

export default function Index() {
	return (
		<>
			<div className='flex flex-wrap mx-auto justify-evenly'>
				<MyCard
					title={'Attendance Report'}
					color={'blue'}
					icon={<IconReport size={100} />}
					path={`${serverLink}reports/attendance`}
				/>
				<MyCard
					title={'Activity Report'}
					color={'blue'}
					icon={<IconReport size={100} />}
					path={`${serverLink}reports/activity`}
				/>
				<MyCard
					title={'Orphans Report'}
					color={'blue'}
					icon={<IconReport size={100} />}
					path={`${serverLink}reports/orphan`}
				/>
				<MyCard
					title={'Sponsor Report'}
					color={'blue'}
					icon={<IconReport size={100} />}
					path={`${serverLink}reports/sponsor`}
				/>
				<MyCard
					title={'Yearly Report'}
					color={'blue'}
					icon={<IconReport size={100} />}
					path={`${serverLink}reports/yearly`}
				/>
				<MyCard
					title={'Sponsorship Report'}
					color={'blue'}
					icon={<IconReport size={100} />}
					path={`${serverLink}reports/sponsorship`}
				/>
				<MyCard
					title={'Attendance Report'}
					color={'blue'}
					icon={<IconReport size={100} />}
					path={`${serverLink}reports/attendance`}
				/>
			</div>
		</>
	);
}
