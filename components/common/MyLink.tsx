import Link from 'next/link';

export default function MyLink({ href = '/', text = 'link', className = '' }) {
	return (
		<li className={'p-2  list-item rounded ' + className}>
			<Link href={href} className={'p-2 m-2 text-xl font-semibold '}>
				{text}
			</Link>
		</li>
	);
}
