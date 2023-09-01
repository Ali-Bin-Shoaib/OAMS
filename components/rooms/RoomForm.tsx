import { useEffect, useState } from 'react';
import {
	ROOM,
	ResponseType,
	STATUS_CODE,
	_Attendance,
	_Orphan,
	_OrphanAttendance,
	_UserWithGuardianAndSponsor,
} from '../../types';
import { useRouter } from 'next/router';
import axios from 'axios';
import { serverLink } from '../../shared/links';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Group, Loader, Select, NumberInput, Container } from '@mantine/core';
import { Wings } from '@prisma/client';
import { $enum } from 'ts-enum-util';
import myNotification from '../MyNotification';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';

interface Props {
	room?: ROOM;
	// orphans: Pick<Orphan, 'id' | 'name'>[];
}
export default function RoomForm({ room }: Props): JSX.Element {
	const { data: session } = useSession();
	const [hydrate, setHydrate] = useState(false);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ROOM>({
		defaultValues: room,
	});

	const router = useRouter();
	const onSubmit = async (data: ROOM) => {
		if (session?.user)
			if (data.User) data.User.id = session?.user.id;
			else data = { ...data, User: { id: session.user.id, name: session.user.name } };
		console.log('🚀 ~ file: RoomForm.tsx:57 ~ onSubmit ~ data:', data);
		if (!room) {
			console.log('Room not exist.');
			const url = `${serverLink}api/room/create`;
			await axios
				.post<ResponseType>(url, data)
				.then((data) => {
					console.log('🚀 ~ file: RoomForm.tsx:64 ~ .then ~ data:', data);
					data.status === STATUS_CODE.OK
						? (myNotification('Create', data.data.msg, 'green', <IconCheck />), router.push(router.asPath))
						: myNotification('Create', data.data.msg, 'red', <IconX />);
				})
				.catch((err) => {
					console.log('error at creating new room--', err);
					myNotification('Create', err.response.data.msg, 'red', <IconX />);
				});
		} else {
			console.log('Room exist.', room.id);
			const url = `${serverLink}/api/room/${room.id}`;
			await axios
				.put(url, data)
				.then((data) => {
					data.status === STATUS_CODE.OK
						? (myNotification('Update', data.data.msg, 'green', <IconCheck />), router.push(router.asPath))
						: myNotification('Update', data.data.msg, 'red', <IconX />);
				})
				.catch((err) => {
					console.log('🚀 ~ file: RoomForm.tsx:85 ~ onSubmit ~ err:', err);
					myNotification('Create', err.response.data.msg, 'red', <IconX />);
				});
		}
	};

	useEffect(() => {
		setHydrate(true);
	}, [hydrate]);

	if (!hydrate) return <Loader size={100} />;
	return (
		<>
			<Container p={10} mx={100}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Container>
						<Controller
							name='wing'
							control={control}
							rules={{
								required: 'Wing is required',
							}}
							render={({ field }) => {
								return (
									<Select
										{...field}
										label='Wing'
										placeholder='choose room wing.'
										required
										defaultValue={room?.wing}
										searchable
										selectOnBlur
										withAsterisk
										error={errors.wing && errors.wing.message}
										nothingFound='Not Found'
										data={$enum(Wings).map((x) => x)}
										hoverOnSearchChange
									/>
								);
							}}
						/>
						<Controller
							name='number'
							control={control}
							// rules={{ required: 'User' }}
							render={({ field }) => {
								return (
									<NumberInput
										{...field}
										// w={'45%'}
										required
										hideControls
										label='Room number'
										withAsterisk
										error={errors.number && errors.number.message}
										defaultValue={room?.number}
									/>
								);
							}}
						/>
						<Controller
							name='capacity'
							control={control}
							// rules={{ required: 'User' }}
							render={({ field }) => {
								return (
									<NumberInput
										{...field}
										// w={'45%'}
										required
										hideControls
										label='Room Capacity'
										withAsterisk
										error={errors.capacity && errors.capacity.message}
										defaultValue={room?.capacity}
									/>
								);
							}}
						/>
					</Container>
					<Group position='center' p={50}>
						<Button type='submit' size='md' w={'100%'}>
							Submit
						</Button>
					</Group>
				</form>
			</Container>
		</>
	);
}
