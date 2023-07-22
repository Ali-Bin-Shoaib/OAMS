import Image from 'next/image';
import { UserAuthForm } from '../../../components/login/userAuthForm';
import logo from '../../img/logo.png';
export default function LoginPage() {
	return (
		<div className='max-w-fit max-h-fit mx-auto items-center justify-center'>
			<Image src={logo} width={500} height={400} priority alt='logo' className='img' />
			<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
				<div className='flex flex-col space-y-2 text-center'>
					<h1 className='text-2xl font-semibold tracking-tight'> Welcome to Orphan and Activity Management System</h1>
					<p className='text-sm text-slate-500 dark:text-slate-400'>Enter your username and password to login to OAMS</p>
				</div>
				<UserAuthForm />
			</div>
		</div>
	);
}
