import { TextInput, PasswordInput, Group, PaperProps, Button, Stack, Container, Title } from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';
import { useSession, signIn, signOut } from 'next-auth/react';
import { User } from 'next-auth';

type FormValues = User;

export function LogIn(props: PaperProps) {
	console.log('🚀 ~ file: LogIn.tsx:26 ~ LogIn ~ props:', props);
	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<FormValues>({
		defaultValues: { username: '', password: '' },
	});

	const onSubmit = (data: FormValues) => {
		console.log(data);
	};
	return (
		<Container radius='md' p='xl' withBorder {...props}>
			<Title order={3} className='text-center'>
				Welcome to Orphan and Activity Management System
			</Title>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack>
					<Controller
						name='username'
						control={control}
						rules={{ required: 'User name is required' }}
						render={({ field }) => (
							<TextInput
								{...field}
								label='User Name'
								placeholder='Your Name'
								error={errors.username && errors.username.message}
							/>
						)}
					/>

					<Controller
						name='password'
						control={control}
						rules={{ required: 'Password is required' }}
						render={({ field }) => (
							<PasswordInput
								{...field}
								label='Password'
								placeholder='Your password'
								error={errors.password && errors.password.message}
							/>
						)}
					/>
				</Stack>

				<Group position='center' mt='xl'>
					<Button type='submit' size='lg'>
						Login
					</Button>
				</Group>
			</form>
		</Container>
	);
}
