import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { User } from 'next-auth';
import myNotification from '../MyNotification';
import { IconCheck, IconX } from '@tabler/icons-react';
import { Button, Group, PasswordInput, TextInput } from '@mantine/core';
import { signIn } from 'next-auth/react';
import { serverLink } from 'shared/links';
import { useState } from 'react';
import { useRouter } from 'next/router';
type FormValues = Pick<User, 'username' | 'password'>;

export function UserAuthForm() {
	const searchParams = useSearchParams();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const router = useRouter();
	const {
		handleSubmit,
		setError,
		control,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: { username: '', password: '' },
	});
	async function onSubmit(data: FormValues) {
		setIsLoading(true);
		data.password = data.password.trim();
		data.username = data.username.trim();
		const callbackUrl = searchParams.get('callbackUrl') || '/';
		console.log('🚀 ~ file: userAuthForm.tsx:29 ~ onSubmit ~ callbackUrl:', callbackUrl);
		try {
			const loginResult = await signIn('credentials', {
				redirect: false,
				...data,
				callbackUrl,
			});
			console.log('🚀 ~ file: userAuthForm.tsx:36 ~ onSubmit ~ loginResult:', loginResult);
			setIsLoading(false);

			if (loginResult?.ok) {
				// setError('username', { message: 'invalid username.' });
				// setError('password', { message: 'invalid password.' });
				router.push(loginResult.url || serverLink);
				return myNotification('Welcome', 'You logged in successfully', 'green', <IconCheck />);
			}
			console.log('🚀 ~ file: userAuthForm.tsx:41 ~ onSubmit ~ isLoading:', isLoading);
			return myNotification('Error', loginResult?.error as string, 'red', <IconX />, isLoading);
		} catch (error) {
			console.log('🚀 ~ file: userAuthForm.tsx:42 ~ onSubmit ~ error:', error);
			return myNotification('Something went wrong', 'Something went wrong', 'red', <IconX />);
		}
	}

	return (
		<div className='grid gap-6'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='grid gap-2'>
					<div className='grid gap-1'>
						<Controller
							name='username'
							control={control}
							rules={{ required: 'User name is required' }}
							render={({ field }) => (
								<TextInput
									{...field}
									required
									label='User Name'
									placeholder='Your Name'
									error={errors.username && errors.username.message}
								/>
							)}
						/>
					</div>
					<div className='grid gap-1'>
						<Controller
							name='password'
							control={control}
							rules={{ required: 'Password is required' }}
							render={({ field }) => (
								<PasswordInput
									{...field}
									required
									label='Password'
									placeholder='Your password'
									error={errors.password && errors.password.message}
								/>
							)}
						/>
					</div>
				</div>
				<Group position='center' mt='xl'>
					<Button type='submit' fullWidth size='lg' loading={isLoading}>
						Login
					</Button>
				</Group>
			</form>
		</div>
	);
}
