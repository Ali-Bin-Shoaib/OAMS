import { Button, Loader } from '@mantine/core';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

function AccessDenied() {
	const { data: session, status } = useSession();
	if (status === 'loading') return <Loader />;
	return (
		<div className='container mx-auto row-auto h-full'>
			<section className='flex flex-col gap-12 items-center'>
				<h1 className='text-5xl '>تم تقييد الوصول</h1>
				<p className='text-3xl max-w-2xl text-center p-10'>
					تم تسجيل الدخول لكن ليس لديك الصلاحية للدخول لهذه الصفحة.
				</p>
				<Link href='/' className='text-3xl underline animate-bounce hover:animate-none'>
					<Button size='xl' color='dark'>
						الرجوع للصفحة الرئيسية
					</Button>
				</Link>
			</section>
		</div>
	);
}
export default AccessDenied;
