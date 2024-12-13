import { IconReport } from '@tabler/icons-react';
import MyCard from 'components/common/MyCard';
import { serverLink } from 'shared/links';

export default function Index() {
	return (
		<>
			<div className='flex flex-wrap mx-auto justify-evenly'>
				<MyCard
					title={'تقرير الحضور'}
					color={'blue'}
					icon={<IconReport size={100} />}
					path={`${serverLink}reports/attendance`}
				/>
				<MyCard
					title={'تقرير الأنشطة'}
					color={'blue'}
					icon={<IconReport size={100} />}
					path={`${serverLink}reports/activity`}
				/>
				<MyCard
					title={'تقرير الأيتام'}
					color={'blue'}
					icon={<IconReport size={100} />}
					path={`${serverLink}reports/orphan`}
				/>
				<MyCard
					title={'تقرير الكفلاء'}
					color={'blue'}
					icon={<IconReport size={100} />}
					path={`${serverLink}reports/sponsor`}
				/>
				<MyCard
					title={'التقرير السنوي'}
					color={'blue'}
					icon={<IconReport size={100} />}
					path={`${serverLink}reports/yearly`}
				/>
				<MyCard
					title={'تقرير الكفالات'}
					color={'blue'}
					icon={<IconReport size={100} />}
					path={`${serverLink}reports/sponsorship`}
				/>
				<MyCard
					title={'تقرير الحضور'}
					color={'blue'}
					icon={<IconReport size={100} />}
					path={`${serverLink}reports/attendance`}
				/>
			</div>
		</>
	);
}
