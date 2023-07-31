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
import { DateInput, DatePickerInput } from '@mantine/dates';
import React from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Button, Group, Container, Loader, Divider, Table, Textarea, TextInput, Checkbox } from '@mantine/core';
import { useSession } from 'next-auth/react';
import { IconCheck, IconSearch, IconX } from '@tabler/icons-react';
import axios from 'axios';
import myNotification from 'components/MyNotification';
import { serverLink } from 'shared/links';

interface Props {
	attendance?: _Attendance;
	orphans: _Orphan[];
	disabled?: boolean;
}
export default function AttendanceForm({ orphans, attendance, disabled }: Props): JSX.Element {
	console.log('🚀 ~ file: AttendanceForm.tsx:27 ~ AttendanceForm ~ attendance:', attendance);
	const { data: session } = useSession();
	const [searchByName, setSearchByName] = useState('');
	// let defaultValues: _Attendance;
	// if (attendance) {
	// 	orphans.map((orphan) => {
	// 		if (!attendance.OrphanAttendance.map((x) => x.Orphan?.id ?? -1).includes(orphan.id as number))
	// 			attendance.OrphanAttendance.push({
	// 				Orphan: orphan,
	// 				orphanId: orphan.id as number,
	// 				absentReason: null as unknown as undefined,
	// 				// attendanceId: attendance.id as number,
	// 				userId: attendance.userId,
	// 				id: undefined,
	// 				isAttended: true as unknown as string,
	// 				justification: undefined,
	// 				notes: undefined,
	// 				returnDay: undefined as unknown as null,
	// 			});
	// 	});
	// defaultValues = attendance;
	// } else {
	// 	defaultValues = {
	// 		OrphanAttendance: orphans.map((orphan) => {
	// 			return {
	// 				Orphan: orphan,
	// 				orphanId: orphan.id as number,
	// 				absentReason: undefined,
	// 				// id: undefined,
	// 				isAttended: true as unknown as string,
	// 				justification: undefined,
	// 				notes: undefined,
	// 				returnDay: undefined as unknown as null,
	// 			};
	// 		}),
	// 		User: undefined,
	// 		date: new Date(),
	// 		userId: 1,
	// 	};
	// }

	const [hydrate, setHydrate] = useState(false);
	const {
		control,
		watch,
		handleSubmit,
		setValue,
		getValues,
		resetField,
		formState: { errors },
	} = useForm<_Attendance>({
		defaultValues: attendance || {
			userId: session?.user.id,
			OrphanAttendance: orphans.map((x) => {
				return { isAttended: true, Orphan: x, orphanId: x.id };
			}),
		},
	});
	const { fields } = useFieldArray({ control, name: 'OrphanAttendance' });
	const router = useRouter();
	const onSubmit = async (data: _Attendance) => {
		console.log('🚀 ~ file: AttendanceForm.tsx:79 ~ onSubmit ~ data:', data);
		if (session?.user) data.userId = session.user.id;
		data.OrphanAttendance.map((x) => {
			x.userId = session?.user?.id!;
			if (!x.absentReason) x.absentReason = undefined;
			if (!x.justification) x.justification = undefined;
			if (!x.notes) x.notes = undefined;
		});
		data.OrphanAttendance.map((oa) => delete oa.Orphan);
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
		router.push(serverLink + 'attendance');
	};

	useEffect(() => {
		setHydrate(true);
	}, [hydrate]);

	if (!hydrate) return <Loader size={100} />;
	return (
		<>
			<Container fluid>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Container className='flex flex-wrap bg-white p-2 my-2 mx-auto rounded' p={15}>
						<Controller
							name='date'
							rules={{ required: 'Attendance day is required' }}
							control={control}
							defaultValue={attendance?.date || new Date()}
							render={({ field }) => {
								return (
									<DateInput
										{...field}
										disabled={disabled}
										label='Attendance data'
										w={'45%'}
										// defaultDate={attendance?.date || new Date()}
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
							render={({ field }) => {
								return (
									<TextInput
										{...field}
										disabled
										label='Created by'
										defaultValue={attendance?.User?.name || session?.user.name}
										w={'45%'}
									/>
								);
							}}
						/>
					</Container>
					<Divider py={30} />
					<div className='container p-2 mx-auto my-2'>
						<TextInput
							onChange={(e) => setSearchByName(e.target.value)}
							placeholder='Search'
							description='search about orphan by name'
							icon={<IconSearch />}
						/>
					</div>

					<Container fluid className='text-center overflow-y-auto max-h-screen '>
						<Table withBorder className='bg-white table'>
							<thead>
								<tr className='text-center'>
									<th className='text-center'>ID</th>
									<th className='text-center'>Name</th>
									<th className='text-center'>Is Attended</th>
									{watch(`OrphanAttendance`).filter((x) => x.isAttended !== true).length !== 0 && (
										<>
											<th className='text-center'>Absent Reason</th>
											<th className='text-center'>Justification</th>
											<th className='text-center'>Notes</th>
											<th className='text-center'>Return Day</th>
										</>
									)}
								</tr>
							</thead>
							<tbody>
								{fields.map(
									(item, index) =>
										item?.Orphan?.name?.toLowerCase().includes(searchByName) && (
											<tr key={item.id}>
												<td>{item.orphanId}</td>
												<td>{item.Orphan?.name}</td>
												<td>
													<Controller
														name={`OrphanAttendance.${index}.isAttended`}
														control={control}
														defaultValue={item.isAttended ? true : false}
														render={({ field: { onChange } }) => {
															return (
																<Checkbox
																	onChange={(e) => {
																		setValue(`OrphanAttendance.${index}.isAttended`, e.target.checked);
																		console.log('🚀 ++++++++++++++ ~ e:', e.target.checked);
																		console.log('🚀 ~absentReason:', item.absentReason);
																		if (e.target.checked) {
																			console.log('++++++true');

																			setValue(`OrphanAttendance.${index}.absentReason`, '');
																			setValue(`OrphanAttendance.${index}.justification`, '');
																			setValue(`OrphanAttendance.${index}.notes`, '');
																			setValue(`OrphanAttendance.${index}.returnDay`, null);
																		}
																	}}
																	checked={watch(`OrphanAttendance.${index}.isAttended`)}
																	// defaultChecked={item.isAttended ? true : false}
																	//  {...field}
																	disabled={disabled}
																/>
															);
														}}
													/>
												</td>
												{watch(`OrphanAttendance`)[index]?.isAttended !== true && (
													<>
														<td>
															<Controller
																name={`OrphanAttendance.${index}.absentReason`}
																control={control}
																render={({ field }) => {
																	return (
																		<Textarea
																			disabled={disabled || watch(`OrphanAttendance`)[index].isAttended}
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
																			disabled={disabled || watch(`OrphanAttendance`)[index].isAttended}
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
																			disabled={disabled || watch(`OrphanAttendance`)[index].isAttended}
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
																			disabled={disabled || watch(`OrphanAttendance`)[index].isAttended}
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
										)
								)}
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
