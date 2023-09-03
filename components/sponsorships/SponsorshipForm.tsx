import { Button, Card, Checkbox, Group, Loader, Radio, Select, SelectItem } from '@mantine/core';
import { $enum } from 'ts-enum-util';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Orphan, PaymentMethod, Prisma, Sponsor, Sponsorship, SponsorshipPeriod } from '@prisma/client';
import React from 'react';
import { DatePickerInput } from '@mantine/dates';
import { _SponsorshipWithSponsorAndOrphan, _Sponsorship, _SponsorshipFormData, _Sponsor } from '../../types';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { serverLink } from '../../shared/links';

import { IconCheck, IconX } from '@tabler/icons-react';
import myNotification from '../MyNotification';
//* factor the form to accept sponsorship and list of orphans and sponsors to display them in select lest
interface Props {
	sponsorship?: _Sponsorship;
	orphans: Orphan[];
	sponsors: _Sponsor[];
	close?: () => void;
}

export default function SponsorshipForm({ sponsorship, sponsors, orphans, close }: Props) {
	const router = useRouter();
	function handleClose() {
		console.log('close');

		close?.();
	}
	const [hydrate, setHydrate] = useState(false);
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<_Sponsorship>({ defaultValues: { ...sponsorship, isActive: false } });
	const onSubmit = async (data: _Sponsorship) => {
		console.log('🚀 ~ file: SponsorshipForm.tsx:30 ~ onSubmit ~ data:', data);
		// const config: AxiosRequestConfig = {
		// 	headers: { 'content-type': 'multipart/form-data' },
		// };
		if (!sponsorship) {
			console.log('user not exist.');
			const url = serverLink + '/api/sponsorship/create/';
			// const res = await axios.post(url, data).catch((err: AxiosError<{ msg: string }>) => {
			const res = await axios
				.post(url, data)
				.then((data) => {
					console.log(data);
					myNotification('Success', 'create new sponsorship successfully', 'green', <IconCheck />);
				})
				.catch((err: AxiosError<{ msg: string }>) => {
					console.log('error at creating new sponsorship', err);
					myNotification('Error', err.response?.data.msg as string, 'red', <IconX />);
				});
			console.log('🚀 ~ file: SponsorshipForm.tsx:38 ~ onSubmit ~ res:', res);
		} else {
			console.log('sponsorship exist.', sponsorship.id);
			const url = serverLink + '/api/sponsorship/' + sponsorship.id;
			const res: AxiosResponse<{ data: any }> = await axios.put(url, data);
			console.log('🚀 ~ file: SponsorshipForm.tsx:43 ~ onSubmit ~ res:', res);
		}
		handleClose();
		router.push(router.asPath);
	};

	useEffect(() => {
		setHydrate(true);
	}, [hydrate]);

	if (!hydrate) return <Loader size={100} />;
	const orphansSelectData: { value: string; label: string }[] = [];
	for (let i = 0; i < orphans.length; i++) {
		const item = { value: orphans[i].id.toString(), label: orphans[i].name! };
		orphansSelectData.push(item);
	}
	const sponsorsSelectData: { value: string; label: string }[] = [];
	for (let i = 0; i < sponsors.length; i++) {
		const item = { value: sponsors[i].id.toString(), label: sponsors[i].user.name! };
		sponsorsSelectData.push(item);
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Card withBorder p={'xl'}>
					<Controller
						name='orphanId'
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
					/>
					<Controller
						name='sponsorId'
						control={control}
						rules={{ required: 'startDate is required' }}
						render={({ field }) => {
							return (
								<Select
									{...field}
									label='Sponsors'
									placeholder='choose sponsor'
									searchable
									nothingFound='No Sponsor'
									data={sponsorsSelectData}
								/>
							);
						}}
					/>
					<Controller
						name='startDate'
						control={control}
						rules={{ required: 'startDate is required' }}
						render={({ field }) => {
							return (
								<DatePickerInput
									{...field}
									valueFormat='YYYY MM D'
									name='startDate'
									label='startDate'
									placeholder='startDate'
									withAsterisk
									error={errors.startDate && errors.startDate.message}
								/>
							);
						}}
					/>
					<Controller
						name='endDate'
						control={control}
						rules={{ required: 'endDate is required' }}
						render={({ field }) => {
							return (
								<DatePickerInput
									{...field}
									valueFormat='YYYY MM D'
									name='endDate'
									label='endDate'
									placeholder='endDate'
									withAsterisk
									error={errors.endDate && errors.endDate.message}
								/>
							);
						}}
					/>
					<Controller
						name='paymentMethod'
						control={control}
						rules={{ required: 'paymentMethod is required' }}
						render={({ field }) => {
							return (
								<Radio.Group
									{...field}
									label={'Payment Method'}
									error={errors?.paymentMethod && errors.paymentMethod.message}
									withAsterisk>
									<Group mt='md'>
										{$enum(PaymentMethod).map((method) => (
											<Radio key={v4()} value={method} label={method.toLowerCase()} />
										))}
									</Group>
								</Radio.Group>
							);
						}}
					/>

					<Controller
						name='sponsorshipPeriod'
						control={control}
						rules={{ required: 'sponsorshipPeriod is required' }}
						render={({ field }) => {
							return (
								<Radio.Group
									{...field}
									label={'Sponsorship Period'}
									error={errors?.sponsorshipPeriod && errors.sponsorshipPeriod.message}
									withAsterisk>
									<Group mt='md'>
										{$enum(SponsorshipPeriod).map((period) => (
											<Radio key={v4()} value={period} label={period.toLowerCase()} />
										))}
									</Group>
								</Radio.Group>
							);
						}}
					/>
					<Controller
						name='isActive'
						control={control}
						// rules={{ required: 'isActive is required' }}
						// render={({ field:{name,onBlur,onChange,ref,value} }) => {
						render={({ field: { onChange } }) => {
							return (
								<Checkbox
									pt={15}
									// defaultChecked={sponsorship?.isActive === undefined ? false : (sponsorship.isActive as unknown as boolean)}
									defaultChecked={sponsorship?.isActive === undefined ? false : sponsorship.isActive}
									onChange={(e) => {
										setValue('isActive', e.target.checked);
										// const isActive = e.target.checked;
									}}
									// defaultChecked={sponsorship ? (sponsorship.isActive ? true : false) : false}
									error={errors?.isActive && errors.isActive.message}
									label='isActive'
									// {...field}
								/>
							);
						}}
					/>

					<Group position='center' pt={50}>
						<Button type='submit' fullWidth>
							Submit
						</Button>
					</Group>
				</Card>
			</form>
		</>
	);
}
