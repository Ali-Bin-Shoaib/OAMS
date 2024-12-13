import { Gender, Grade } from '@prisma/client';
import { ResponseType, STATUS_CODE, orphanWithGuardianAndSponsorshipInfo } from 'types';
import logo from '../../src/img/1.jpg';
import Image from 'next/image';
import { Button, Text, Tooltip, useMantineTheme } from '@mantine/core';
import { IconInfoCircle, IconEdit, IconUserPlus, IconTrash, IconCheck, IconX } from '@tabler/icons-react';
import DeleteModal from 'components/common/DeleteModal';
import router from 'next/router';
import { Pages, serverLink } from 'shared/links';
import { useSession } from 'next-auth/react';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import axios, { AxiosResponse } from 'axios';
import myNotification from 'components/MyNotification';
interface Props {
	orphan: orphanWithGuardianAndSponsorshipInfo;
}
function MyCard({ orphan }: Props) {
	const { data: session, status } = useSession();
	console.log('🚀 ~ file: MyCard.tsx:16 ~ MyCard ~ session:', session);
	const theme = useMantineTheme();
	return (
		<div className='all'>
			<div className='card'>
				<div className='card-header'>
					<h2>معلومات اليتيم</h2>
				</div>
				<div className='card-body'>
					<div className='card-image'>
						<Image src={logo} alt={orphan.name} />
					</div>
					{session?.user?.type === 'ADMIN' && (
						<div className='card-curd '>
							<>
								<Tooltip label='معلومات اليتيم'>
									{/* <Button w={50} color='gray' onClick={() => router.push(Pages?.Orphans.link + orphan?.id)}> */}
									<IconInfoCircle
										color={theme.colors.gray[9]}
										className='bg-gray-50 rounded-xl mx-3 hover:cursor-pointer'
										size={40}
										onClick={() => router.push(Pages?.Orphans.link + orphan?.id)}
									/>
									{/* </Button> */}
								</Tooltip>
								<Tooltip label='تعديل'>
									{/* <Button w={50} color='yellow' onClick={() => router.push(`${serverLink}orphans/action/${orphan?.id}`)}> */}
									<IconEdit
										color={theme.colors.yellow[9]}
										className='bg-yellow-50 rounded-xl mx-2 hover:cursor-pointer'
										size={40}
										onClick={() => router.push(`${serverLink}orphans/action/${orphan?.id}`)}
									/>
									{/* </Button> */}
								</Tooltip>
								<Tooltip label='حذف'>
									<IconTrash
										color='red'
										className='bg-red-100 rounded-xl hover:cursor-pointer'
										size={40}
										onClick={() => {
											modals.openConfirmModal({
												title: `حذف معلومات ${orphan.name}.`,
												dir: 'rtl',
												centered: true,
												children: <Text size='sm'>هل أنت متأكد من حذف معلومات {orphan.name}?</Text>,
												labels: { confirm: `حذف`, cancel: `إلغاء ` },
												confirmProps: { color: 'red' },
												onCancel: () =>
													notifications.show({
														title: 'إلغاء',
														dir: 'rtl',

														message: `إلغاء الحذف`,
														color: 'gray',
														icon: <IconInfoCircle />,
													}),
												onConfirm: async () => {
													try {
														const res: AxiosResponse<ResponseType> = await axios.delete<ResponseType>(
															`${serverLink}/api/orphan/${orphan.id}`
														);
														if (res.status === STATUS_CODE.OK) {
															myNotification('Success', res.data.msg, 'green', <IconCheck />);
															router.reload();
														} else {
															myNotification('Error', res.data.msg || 'البيانات غير موجودة.', 'red', <IconX />);
														}
													} catch (error) {
														if (axios.isAxiosError(error)) myNotification('Error', 'حدث خطأ ما.', 'red', <IconX />);
														router.push(router.asPath);
														console.log('🚀 ~ file: DeleteModal.tsx:55 ~ onConfirm: ~ error:', error);
													}
												},
											});
										}}
									/>
								</Tooltip>
								{/* <DeleteModal id={orphan?.id} title={'Orphan'} url='orphan' size='sm' buttonOrIcon={<IconTrash size={50} />} /> */}
							</>
						</div>
					)}
					<div className='card-details'>
						<ul>
							<li className='text-ellipsis overflow-hidden text-white'>
								<strong>الإسم:</strong> {orphan.name}
							</li>
							<li className='text-ellipsis overflow-hidden text-white'>
								<strong>التقييم:</strong>
								{orphan.evaluation?.toFixed(2) || 0}
							</li>
							<li className='text-ellipsis overflow-hidden text-white'>
								<strong>العمر:</strong> {orphan.age}
							</li>
							<li className='text-ellipsis overflow-hidden text-white'>
								<strong>الحنس:</strong> {orphan.gender}
							</li>
							<li className='text-ellipsis overflow-hidden text-white'>
								<strong>العنوان:</strong> {orphan.currentAddress}
							</li>
							<li className='text-ellipsis overflow-hidden text-white'>
								<strong>اريخ الميلاد:</strong> {orphan.birthdate.toDateString()}
							</li>
							<li className='text-ellipsis overflow-hidden text-white'>
								<strong>المدرسة:</strong> {orphan.schoolName}
							</li>
							<li className='text-ellipsis overflow-hidden text-white'>
								<strong>المستوى:</strong> {orphan.gradeLevel}
							</li>
							<li className='text-ellipsis overflow-hidden text-white'>
								<strong>الوصي:</strong> {orphan.Guardian?.user?.name}
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className='container'>
				{session?.user?.type === 'ADMIN' && (
					<Button
						className='btn btn1'
						size='xl'
						leftIcon={<IconUserPlus />}
						onClick={() => router.push(`${serverLink}orphans/action/create`)}>
						إضافة يتيم
					</Button>
				)}
			</div>
		</div>
	);
}
export default MyCard;
