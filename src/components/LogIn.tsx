/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { LockClosedIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';

export default function LogIn() {
	return (
		<>
			{/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
			<div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
				<div className='w-full max-w-md space-y-8'>
					<div>
						<Image
							width={200}
							height={200}
							className='mx-auto h-12 w-auto'
							src='/../public/img/1.jpg'
							alt='Your Company'
						/>
						<h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
							Sign in to your account
						</h2>
						<p className='mt-2 text-center text-sm text-gray-600'>
							Or{' '}
							<a href='#' className='font-medium text-stone-600 hover:text-stone-500'>
								start your 14-day free trial
							</a>
						</p>
					</div>
					<form className='mt-8 space-y-6' action='#' method='POST'>
						<input type='hidden' name='remember' defaultValue='true' />
						<div className='-space-y-px rounded-md shadow-sm'>
							<div>
								<label htmlFor='email-address' className='sr-only'>
									Email address
								</label>
								<input
									id='email-address'
									name='email'
									type='email'
									autoComplete='email'
									required
									className='relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-stone-600 sm:text-sm sm:leading-6'
									placeholder='Email address'
								/>
							</div>
							<div>
								<label htmlFor='password' className='sr-only'>
									Password
								</label>
								<input
									id='password'
									name='password'
									type='password'
									autoComplete='current-password'
									required
									className='relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-stone-600 sm:text-sm sm:leading-6'
									placeholder='Password'
								/>
							</div>
						</div>

						<div className='flex items-center justify-between'>
							<div className='flex items-center'>
								<input
									id='remember-me'
									name='remember-me'
									type='checkbox'
									className='h-4 w-4 rounded border-gray-300 text-stone-600 focus:ring-stone-600'
								/>
								<label htmlFor='remember-me' className='ml-2 block text-sm text-gray-900'>
									Remember me
								</label>
							</div>

							<div className='text-sm'>
								<a href='#' className='font-medium text-stone-600 hover:text-stone-500'>
									Forgot your password?
								</a>
							</div>
						</div>

						<div>
							<button
								type='submit'
								className='group relative flex w-full justify-center rounded-md bg-stone-600 py-2 px-3 text-sm font-semibold text-white hover:bg-stone-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600'>
								<span className='absolute inset-y-0 left-0 flex items-center pl-3'>
									<LockClosedIcon
										className='h-5 w-5 text-stone-500 group-hover:text-stone-400'
										aria-hidden='true'
									/>
								</span>
								Sign in
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
