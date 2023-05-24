import { $enum } from 'ts-enum-util';
import { useEffect, useState } from 'react';
import { _Attendance, _Orphan, _OrphanAttendance, _UserWithGuardianAndSponsor } from '../../types/types';
import { useRouter } from 'next/router';
import axios from 'axios';
import { serverLink } from '../../shared/links';
import { DateInput, DatePickerInput } from '@mantine/dates';
import React from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Checkbox, Textarea, TextInput } from 'react-hook-form-mantine';
import { Button, Group, Paper, Container, Stack, Loader, Divider, Table } from '@mantine/core';
// import { DevTool } from '@hookform/devtools';

interface Props {
	attendance?: _Attendance;
	orphans: _Orphan[];
}
export default function AttendanceForm({ orphans, attendance }: Props): JSX.Element {
	const defaultValues: _Attendance = attendance
		? attendance
		: // : { OrphanAttendance: orphans.map((orphan) => ({ Orphan: orphan, orphanId: orphan.id, isAttended: true })) };
		  {
				OrphanAttendance: orphans.map((orphan) => {
					return {
						Orphan: orphan,
						orphanId: orphan.id as number,
						absentReason: null as unknown as undefined,
						isAttended: true,
						justification: null as unknown as undefined,
						notes: null as unknown as undefined,
						returnDay: undefined as unknown as null,
					};
				}),
				User: null,
				date: new Date(),
				userId: 1,
		  };

	const [hydrate, setHydrate] = useState(false);
	const {
		control,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<_Attendance>({
		defaultValues: defaultValues,
	});

	const { fields } = useFieldArray({ control, name: 'OrphanAttendance' });
	const router = useRouter();
	const onSubmit = async (data: _Attendance) => {
		data.OrphanAttendance = data.OrphanAttendance.filter((x) => x.isAttended != true);
		console.log('🚀 ~ file: AttendanceForm.tsx:49 ~ onSubmit ~ data:', data);
		// const config: AxiosRequestConfig = {
		// 	headers: { 'content-type': 'multipart/form-data' },
		// };
		if (!attendance) {
			console.log('attendance not exist.');
			const url = serverLink + 'api/attendance/create';
			data.OrphanAttendance.map((oa) => delete oa.Orphan);
			const res = await axios.post(url, data).catch((err) => console.log('error at creating new attendance--', err));
			console.log('🚀 ~ file: AttendanceForm.tsx:40 ~ onSubmit ~ res:', res);
		} else {
			console.log('attendance exist.', attendance.id);
			const url = serverLink + '/api/attendance/' + attendance.id;
			const res = await axios.put(url, data);
			console.log('🚀 ~ file: AttendanceForm.tsx:45 ~ onSubmit ~ res:', res);
		}
		close();
		router.push(router.asPath);
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
										placeholder='date'
										withAsterisk
										error={errors.date && errors.date.message}
									/>
								);
							}}
						/>
						{/* <Controller
							name='User.name'
							// rules={{ required: 'User' }}
							render={({ field }) => {
							return */}
						<TextInput
							//   {...field}
							control={control}
							disabled
							name='User.name'
							label='User name'
							defaultValue={'fix user name'}
							w={'45%'}
						/>

						{/* }}
						/> */}
					</Container>
					<Divider py={30} />
					<Container fluid className='text-center'>
						<Table>
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
											{/* <Controller
												render={({ field }) => {
												return ( */}
											<Checkbox
												name={`OrphanAttendance.${index}.isAttended`}
												rules={{ required: 'this field is required' }}
												control={control}
												defaultChecked={item.isAttended ? item.isAttended : true}
												// defaultChecked={item.isAttended===true ? item.isAttended.toString():'false'}
												error={errors?.OrphanAttendance && errors.OrphanAttendance.message}
												// {...field}
											/>
											{/* );
												}}
											/> */}
										</td>
										<td>
											{/* <Controller
												render={({ field }) => {
												return ( */}
											<Textarea
												name={`OrphanAttendance.${index}.absentReason`}
												control={control}
												disabled={watch(`OrphanAttendance`)[index].isAttended ? true : false}
												error={errors?.OrphanAttendance && errors.OrphanAttendance.message}
												// {...field}
											/>
											{/* );
												}}
											/> */}
										</td>
										<td>
											{/* <Controller
												render={({ field }) => {
												return ( */}
											<Textarea
												name={`OrphanAttendance.${index}.justification`}
												control={control}
												disabled={watch(`OrphanAttendance`)[index].isAttended ? true : false}
												error={errors?.OrphanAttendance && errors.OrphanAttendance.message}
												// {...field}
											/>
											{/* );
												}}
											/> */}
										</td>
										<td>
											{/* <Controller
												render={({ field }) => {
												return ( */}
											<Textarea
												name={`OrphanAttendance.${index}.notes`}
												control={control}
												disabled={watch(`OrphanAttendance`)[index].isAttended ? true : false}
												error={errors?.OrphanAttendance && errors.OrphanAttendance.message}
												// {...field}
											/>
											{/* );
												}}
											/> */}
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
