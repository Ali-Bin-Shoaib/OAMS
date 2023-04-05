import Link from 'next/link';

export default function MyLink({ href = '/', text = 'link' }) {
	return (
		<li className='p-2'>
			<Link href={href} className='text-xl font-semibold'>
				{text}
			</Link>
		</li>
	);
}
