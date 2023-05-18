import { Button, Container, Divider, Group, Loader, Select, TextInput } from '@mantine/core';
import { $enum } from 'ts-enum-util';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { _Attendance, _Orphan, _OrphanAttendance, _UserWithGuardianAndSponsor } from '../../types/types';
import { useRouter } from 'next/router';
import axios from 'axios';
import { serverLink } from '../../shared/links';
import { DateInput, DatePickerInput } from '@mantine/dates';
import React from 'react';
import AttendanceTable from './OrphanAttendanceTable';
import { OrphanAttendance } from '@prisma/client';
import OrphanAttendanceComponent from './OrphanAttendanceComponent';
import { v4 } from 'uuid';
import OrphanAttendanceTable from './OrphanAttendanceTable';
interface Props {
	attendance?: _Attendance;
	orphans: _Orphan[];
	// orphanAttendance: _OrphanAttendance[];
}
export default function AttendanceForm({ orphans, attendance }: Props): JSX.Element {
	console.log('🚀 ~ file: AttendanceForm.tsx:22 ~ AttendanceForm ~ attendance:', attendance);

	if (!attendance) {
		// attendance.
	}

	const router = useRouter();
	const [hydrate, setHydrate] = useState(false);
	const {
		control,
		watch,
		handleSubmit,
		getValues,
		setValue,
		formState: { errors },
	} = useForm<_Attendance>({ defaultValues: attendance });
	// } = useForm<User>({ defaultValues: { ...orphan, type: userType } });

	const onSubmit = async (data: _Attendance) => {
		console.log('🚀 ~ file: UserForm.tsx:29 ~ onSubmit ~ data:', data);
		// const config: AxiosRequestConfig = {
		// 	headers: { 'content-type': 'multipart/form-data' },
		// };
		// if (!orphan) {
		// 	console.log('user not exist.');
		// 	const url = serverLink + '/api/user/create/';
		// 	const res = await axios.post(url, data).catch((err) => console.log('error at creating new user--', err));
		// 	console.log('🚀 ~ file: UserForm.tsx:36 ~ onSubmit ~ res:', res);
		// } else {
		// 	console.log('user exist.', orphan.id);
		// 	const url = serverLink + '/api/user/' + orphan.id;
		// 	const res = await axios.put(url, data);
		// 	console.log('🚀 ~ file: UserForm.tsx:52 ~ onSubmit ~ res:', res);
		// }
		// router.push(router.asPath);
	};

	useEffect(() => {
		setHydrate(true);
	}, [hydrate]);
	// const orphansSelectData: { value: string; label: string }[] = [];
	// for (let i = 0; i < orphans.length; i++) {
	// 	const item = { value: orphans[i].id.toString(), label: orphans[i].name! };
	// 	orphansSelectData.push(item);
	// }

	if (!hydrate) return <Loader size={100} />;
	return (
		<>
			<Container fluid>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Container className='flex flex-wrap ' p={15}>
						<Controller
							name='date'
							control={control}
							rules={{ required: 'startDate is required' }}
							render={({ field }) => {
								return <DateInput {...field} label='Attendance data' w={'45%'} placeholder='date' />;
							}}
						/>
						<Controller
							name='User.name'
							control={control}
							rules={{ required: 'User' }}
							render={({ field }) => {
								return <TextInput disabled label='User name' value={'fix user name'} w={'45%'} />;
							}}
						/>
					</Container>
					<Divider py={30} />
					<Container fluid>
						<table>
							<thead>
								<tr>
									<td>id</td>
									<td>name</td>
									<td>isAttended</td>
								</tr>
								{orphans?.map((orphan) => (
									// <div key={v4()}>{orphan.name}</div>
									<tr key={v4()}>
										<OrphanAttendanceComponent orphan={orphan} />
									</tr>
								))}
							</thead>
						</table>
					</Container>
					{/* <OrphanAttendanceTable orphanAttendance={orphanAttendance} /> */}

					<Group position='center' pt={50}>
						<Button type='submit'>Submit</Button>
					</Group>
				</form>
			</Container>
		</>
	);
}

{
	/* <Controller
						name='id'
						control={control}
						rules={{ required: 'startDate is required' }}
						render={({ field }) => {
							return (
								<Select
									{...field}
									label='Orphans'
									placeholder='choose orphan'
									searchable
									nothingFound='No Orphans'
									data={orphansSelectData}
								/>
							);
						}}
					/> */
}
