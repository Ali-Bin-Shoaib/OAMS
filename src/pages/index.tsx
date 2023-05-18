import {
	IconAbacus,
	IconAccessPoint,
	IconActivity,
	IconAdjustments,
	IconBell,
	IconCalendarCheck,
	IconDashboard,
	IconGift,
	IconGrowth,
	IconHandMove,
	IconHealthRecognition,
	IconHeartHandshake,
	IconHeartPlus,
	IconHearts,
	IconHexagonLetterH,
	IconHomeHand,
	IconMoodSmile,
	IconPackage,
	IconPlayCard,
	IconPlayerPlay,
	IconReceipt,
	IconRibbonHealth,
	IconSchool,
	IconUser,
	IconUserBolt,
	IconUserCode,
	IconUserDollar,
	IconUserDown,
	IconUserPin,
	IconUserPlus,
	IconUserShield,
	IconUserStar,
} from '@tabler/icons-react';
import AppHead from '../../components/common/AppHead';
import MyCard from '../../components/common/MyCard';
import { usePageTitle } from '../../hooks/usePageTitle';
import { useRouter } from 'next/router';

export default function Home() {
	const title = usePageTitle();
	const router = useRouter();
	return (
		<div>
			<AppHead title={title} />
			<div className='flex flex-wrap mx-auto justify-evenly'>
				<MyCard title={'Orphans'} count={50} color={'blue'} icon={<IconUserStar size={100} path='orphans' />} />
				<MyCard title={'Sponsors'} count={50} color={'blue'} icon={<IconUserPlus size={100} />} />
				<MyCard title={'Sponsorships'} count={50} color={'blue'} icon={<IconReceipt size={100} />} />
				<MyCard title={'Guardians'} count={50} color={'blue'} icon={<IconUserShield size={100} />} />
				<MyCard title={'Users'} count={50} color={'blue'} icon={<IconUser size={100} />} />
				<MyCard title={'Activities'} count={500} color={'blue'} icon={<IconActivity size={100} />} />
				{/* <MyCard title={'Health Info'} count={50} color={'blue'} icon={<IconHeartPlus size={80} />} />
				<MyCard title={'Behavior Info'} count={50} color={'blue'} icon={<IconAdjustments size={80} />} />
				<MyCard title={'Education Info'} count={50} color={'blue'} icon={<IconSchool size={80} />} />
				<MyCard title={'Attendance Info'} count={50} color={'blue'} icon={<IconCalendarCheck size={80} />} /> */}
			</div>
			{/* <div
				className=' rounded-lg shadow-lg p-4 flex  card items-center transition-transform 
			duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-md'> */}
			{/* <MyCard title={'Users'} length={5} color={'green'} icon={<IconUser />} />
				<MyCard title={'Users'} length={5} color={'blue'} icon={<IconUser />} /> */}
			{/* </div> */}
		</div>
	);
}
