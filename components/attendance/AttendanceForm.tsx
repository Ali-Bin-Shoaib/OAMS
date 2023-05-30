import { $enum } from 'ts-enum-util';
import { useEffect, useState } from 'react';
import { _Attendance, _Orphan, _OrphanAttendance, _UserWithGuardianAndSponsor } from '../../types/types';
import { useRouter } from 'next/router';
import axios from 'axios';
import { serverLink } from '../../shared/links';
import { DateInput, DatePickerInput } from '@mantine/dates';
import React from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import {
	Button,
	Group,
	Paper,
	Container,
	Stack,
	Loader,
	Divider,
	Table,
	Textarea,
	TextInput,
	Checkbox,
} from '@mantine/core';
// import { DevTool } from '@hookform/devtools';

interface Props {
	attendance?: _Attendance;
	orphans: _Orphan[];
}
export default function AttendanceForm({ orphans, attendance }: Props): JSX.Element {
	// console.log('🚀 ~ file: AttendanceForm.tsx:19 ~ AttendanceForm ~ attendance:', attendance);
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
					isAttended: true,
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
					isAttended: true,
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
		resetField,
		setValue,

		reset,
		formState: { errors },
	} = useForm<_Attendance>({
		defaultValues: defaultValues,
	});

	const { fields, update } = useFieldArray({ control, name: 'OrphanAttendance' });
	const router = useRouter();
	const onSubmit = async (data: _Attendance) => {
		// data.OrphanAttendance = data.OrphanAttendance.filter((x) => x.isAttended == false);
		data.OrphanAttendance.map((oa) => delete oa.Orphan);
		console.log('🚀 ~ file: AttendanceForm.tsx:49 ~ onSubmit ~ data:', data);
		// const config: AxiosRequestConfig = {
		// 	headers: { 'content-type': 'multipart/form-data' },
		// };
		if (!attendance) {
			console.log('attendance not exist.');
			const url = serverLink + 'api/attendance/create';
			const res = await axios.post(url, data).catch((err) => console.log('error at creating new attendance--', err));
			console.log('🚀 ~ file: AttendanceForm.tsx:40 ~ onSubmit ~ res:', res);
		} else {
			console.log('attendance exist.', attendance.id);
			const url = serverLink + '/api/attendance/' + attendance.id;
			const res = await axios.put(url, data);
			console.log('🚀 ~ file: AttendanceForm.tsx:45 ~ onSubmit ~ res:', res);
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
			<Container fluid>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Container className='flex flex-wrap' p={15}>
						<Controller
							name='date'
							rules={{ required: 'Attendance day is required' }}
							control={control}
							render={({ field }) => {
								return (
									<DateInput
										{...field}
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
								return (
									<TextInput
										{...field}
										disabled
										name='User.name'
										label='User name'
										defaultValue={attendance?.User?.name}
										w={'45%'}
									/>
								);
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
									<th>Absent Reason</th>
									<th>Justification</th>
									<th>Notes</th>
									<th>Return Day</th>
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
												// defaultValue={item.isAttended ? item.isAttended : true}
												render={({ field }) => {
													// field.onChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
													return (
														<Checkbox
															defaultChecked={item.isAttended}
															// defaultChecked={item.isAttended ? item.isAttended : true}
															// defaultChecked={item.isAttended===true ? item.isAttended.toString():'false'}
															{...field}
														/>
													);
												}}
											/>
										</td>

										<td>
											<Controller
												name={`OrphanAttendance.${index}.absentReason`}
												control={control}
												render={({ field }) => {
													return (
														<Textarea
															disabled={watch(`OrphanAttendance`)[index].isAttended ? true : false}
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
															disabled={watch(`OrphanAttendance`)[index].isAttended ? true : false}
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
															disabled={watch(`OrphanAttendance`)[index].isAttended ? true : false}
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
															disabled={watch(`OrphanAttendance`)[index].isAttended ? true : false}
															error={errors?.OrphanAttendance && errors.OrphanAttendance.message}
															{...field}
														/>
													);
												}}
											/>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</Container>
					<Group position='center' pt={50}>
						<Button type='submit'>Submit</Button>
					</Group>
				</form>
			</Container>
		</>
	);
}
