import { useEffect, useState } from 'react';
import {
	ResponseType,
	STATUS_CODE,
	_Attendance,
	_Orphan,
	_OrphanAttendance,
	_UserWithGuardianAndSponsor,
} from '../../types';
import { useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';
import { serverLink } from '../../shared/links';
import { DateInput, DatePickerInput } from '@mantine/dates';
import React from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Button, Group, Container, Loader, Divider, Table, Textarea, TextInput, Checkbox } from '@mantine/core';
import { useSession } from 'next-auth/react';
import myNotification from 'components/MyNotification';
import { IconCheck, IconX } from '@tabler/icons-react';

interface Props {
	attendance?: _Attendance;
	orphans: _Orphan[];
	disabled?: boolean;
}
export default function AttendanceForm({ orphans, attendance, disabled }: Props): JSX.Element {
	const { data: session } = useSession();
	let defaultValues: _Attendance;
	if (attendance) {
		orphans.map((orphan) => {
			if (!attendance.OrphanAttendance.map((x) => x.Orphan?.id ?? -1).includes(orphan.id as number))
				attendance.OrphanAttendance.push({
					Orphan: orphan,
					orphanId: orphan.id as number,
					absentReason: null as unknown as undefined,
					// attendanceId: attendance.id as number,
					userId: attendance.userId,
					id: undefined,
					isAttended: true as unknown as string,
					justification: undefined,
					notes: undefined,
					returnDay: undefined as unknown as null,
				});
		});
		defaultValues = attendance;
	} else {
		defaultValues = {
			OrphanAttendance: orphans.map((orphan) => {
				return {
					Orphan: orphan,
					orphanId: orphan.id as number,
					absentReason: undefined,
					// id: undefined,
					isAttended: true as unknown as string,
					justification: undefined,
					notes: undefined,
					returnDay: undefined as unknown as null,
				};
			}),
			User: undefined,
			date: new Date(),
			userId: 1,
		};
	}

	const [hydrate, setHydrate] = useState(false);
	const {
		control,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<_Attendance>({
		defaultValues: defaultValues,
	});

	const { fields, update } = useFieldArray({ control, name: 'OrphanAttendance' });
	const router = useRouter();
	const onSubmit = async (data: _Attendance) => {
		if (session?.user) data.userId = session.user.id;
		// data.OrphanAttendance = data.OrphanAttendance.filter((x) => x.isAttended == false);
		data.OrphanAttendance.map((oa) => delete oa.Orphan);
		console.log('🚀 ~ file: AttendanceForm.tsx:49 ~ onSubmit ~ data:', data);
		// const config: AxiosRequestConfig = {
		// 	headers: { 'content-type': 'multipart/form-data' },
		// };
		try {
			if (!attendance) {
				console.log('attendance not exist.');
				const url = serverLink + 'api/attendance/create';
				const res = await axios.post<ResponseType>(url, data);
				if (res.status === STATUS_CODE.OK) {
					console.log('🚀 ~ file: AttendanceForm.tsx:84 ~ onSubmit ~ res:', res);
					myNotification('Success', res.data.msg, 'green', <IconCheck />);
				} else myNotification('Error', res.data.msg, 'red', <IconX />);
			} else {
				console.log('attendance exist.', attendance.id);
				const url = serverLink + '/api/attendance/' + attendance.id;
				const res = await axios.put<ResponseType>(url, data);
				if (res.status === STATUS_CODE.OK) {
					console.log('🚀 ~ file: AttendanceForm.tsx:92 ~ onSubmit ~ res:', res);
					myNotification('Success', res.data.msg, 'green', <IconX />);
				} else myNotification('Error', res.data.msg, 'red', <IconX />);
			}
		} catch (error) {
			if (axios.isAxiosError(error)) console.log('🚀 ~ file: AttendanceForm.tsx:93 ~ onSubmit ~ error:', error);
			myNotification('Error', error.response.data.msg, 'red', <IconX />);
		}
		// close();
		// router.push(router.asPath);
		router.push(serverLink + 'attendance');
	};

	useEffect(() => {
		setHydrate(true);
	}, [hydrate]);

	if (!hydrate) return <Loader size={100} />;
	return (
		<>
			<Container fluid className='bg-white'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Container className='flex flex-wrap ' p={15}>
						<Controller
							name='date'
							rules={{ required: 'Attendance day is required' }}
							control={control}
							render={({ field }) => {
								return (
									<DateInput
										{...field}
										disabled={disabled}
										label='Attendance data'
										w={'45%'}
										defaultDate={attendance?.date}
										placeholder='date'
										withAsterisk
										error={errors.date && errors.date.message}
									/>
								);
							}}
						/>
						<Controller
							name='User.name'
							control={control}
							// rules={{ required: 'User' }}
							render={({ field }) => {
								return <TextInput {...field} disabled label='Created by' defaultValue={attendance?.User?.name} w={'45%'} />;
							}}
						/>
					</Container>
					<Divider py={30} />
					<Container fluid className='text-center'>
						<Table withBorder>
							<thead>
								<tr className='text-center'>
									<th>id</th>
									<th>Name</th>
									<th>Is Attended</th>
									{watch(`OrphanAttendance`)
										.map((x) => x.isAttended)
										.includes(false as unknown as string) ? (
										<>
											<th className='text-white'>Absent Reason</th>
											<th className='text-white'>Justification</th>
											<th className='text-white'>Notes</th>
											<th className='text-white'>Return Day</th>
										</>
									) : (
										''
									)}
								</tr>
							</thead>
							<tbody>
								{fields.map((item, index) => (
									<tr key={item.id}>
										<td>{item.Orphan?.id}</td>
										<td>{item.Orphan?.name}</td>
										<td>
											<Controller
												name={`OrphanAttendance.${index}.isAttended`}
												control={control}
												render={({ field }) => {
													return (
														<Checkbox
															defaultChecked={(item.isAttended as unknown as boolean) || false}
															{...field}
															disabled={disabled}
														/>
													);
												}}
											/>
										</td>
										{watch(`OrphanAttendance`)[index].isAttended ? (
											''
										) : (
											<>
												<td>
													<Controller
														name={`OrphanAttendance.${index}.absentReason`}
														control={control}
														render={({ field }) => {
															return (
																<Textarea
																	disabled={disabled || watch(`OrphanAttendance`)[index].isAttended ? true : false}
																	error={errors?.OrphanAttendance && errors.OrphanAttendance.message}
																	{...field}
																/>
															);
														}}
													/>
												</td>
												<td>
													<Controller
														name={`OrphanAttendance.${index}.justification`}
														control={control}
														render={({ field }) => {
															return (
																<Textarea
																	disabled={disabled || watch(`OrphanAttendance`)[index].isAttended ? true : false}
																	error={errors?.OrphanAttendance && errors.OrphanAttendance.message}
																	{...field}
																/>
															);
														}}
													/>
												</td>
												<td>
													<Controller
														name={`OrphanAttendance.${index}.notes`}
														control={control}
														render={({ field }) => {
															return (
																<Textarea
																	disabled={disabled || watch(`OrphanAttendance`)[index].isAttended ? true : false}
																	error={errors?.OrphanAttendance && errors.OrphanAttendance.message}
																	{...field}
																/>
															);
														}}
													/>
												</td>
												<td>
													<Controller
														name={`OrphanAttendance.${index}.returnDay`}
														control={control}
														render={({ field }) => {
															return (
																<DatePickerInput
																	disabled={disabled || watch(`OrphanAttendance`)[index].isAttended ? true : false}
																	error={errors?.OrphanAttendance && errors.OrphanAttendance.message}
																	{...field}
																/>
															);
														}}
													/>
												</td>
											</>
										)}
									</tr>
								))}
							</tbody>
						</Table>
					</Container>
					<Group position='center' py={50}>
						{disabled || <Button type='submit'>Submit</Button>}
					</Group>
				</form>
			</Container>
		</>
	);
}
