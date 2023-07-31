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
					<h2>Orphan Information</h2>
				</div>
				<div className='card-body'>
					<div className='card-image'>
						<Image src={logo} alt={orphan.name} />
					</div>
					{session?.user?.type === 'ADMIN' && (
						<div className='card-curd'>
							<>
								<Tooltip label='Info'>
									{/* <Button w={50} color='gray' onClick={() => router.push(Pages?.Orphans.link + orphan?.id)}> */}
									<IconInfoCircle
										color={theme.colors.gray[9]}
										className='bg-gray-50 rounded-xl mx-3 hover:cursor-pointer'
										size={40}
										onClick={() => router.push(Pages?.Orphans.link + orphan?.id)}
									/>
									{/* </Button> */}
								</Tooltip>
								<Tooltip label='Edit'>
									{/* <Button w={50} color='yellow' onClick={() => router.push(`${serverLink}orphans/action/${orphan?.id}`)}> */}
									<IconEdit
										color={theme.colors.yellow[9]}
										className='bg-yellow-50 rounded-xl mx-2 hover:cursor-pointer'
										size={40}
										onClick={() => router.push(`${serverLink}orphans/action/${orphan?.id}`)}
									/>
									{/* </Button> */}
								</Tooltip>
								<Tooltip label='Delete'>
									<IconTrash
										color='red'
										className='bg-red-100 rounded-xl hover:cursor-pointer'
										size={40}
										onClick={() => {
											modals.openConfirmModal({
												title: `Delete ${orphan.name} Info.`,
												centered: true,
												children: <Text size='sm'>Are you sure you want to delete this {orphan.name}?</Text>,
												labels: { confirm: `Delete`, cancel: `No don't Delete it` },
												confirmProps: { color: 'red' },
												onCancel: () =>
													notifications.show({
														title: 'Cancel',
														message: `Cancel Delete`,
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
															myNotification('Error', res.data.msg || 'Record to be deleted was not found.', 'red', <IconX />);
														}
													} catch (error) {
														if (axios.isAxiosError(error)) myNotification('Error', 'Something went wrong.', 'red', <IconX />);
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
								<strong>Name:</strong> {orphan.name}
							</li>
							<li className='text-ellipsis overflow-hidden text-white'>
								<strong>Evaluation:</strong>
							</li>
							<li className='text-ellipsis overflow-hidden text-white'>
								<strong>Age:</strong> {orphan.age}
							</li>
							<li className='text-ellipsis overflow-hidden text-white'>
								<strong>Sex:</strong> {orphan.gender}
							</li>
							<li className='text-ellipsis overflow-hidden text-white'>
								<strong>Location:</strong> {orphan.currentAddress}
							</li>
							<li className='text-ellipsis overflow-hidden text-white'>
								<strong>Birthdate:</strong> {orphan.birthdate.toDateString()}
							</li>
							<li className='text-ellipsis overflow-hidden text-white'>
								<strong>School:</strong> {orphan.schoolName}
							</li>
							<li className='text-ellipsis overflow-hidden text-white'>
								<strong>Level:</strong> {orphan.gradeLevel}
							</li>
							<li className='text-ellipsis overflow-hidden text-white'>
								<strong>Guardian:</strong> {orphan.Guardian?.user?.name}
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
						Add Orphan
					</Button>
				)}
			</div>
		</div>
	);
}
export default MyCard;
