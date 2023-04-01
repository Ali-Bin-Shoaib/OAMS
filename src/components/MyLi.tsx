import Link from 'next/link';

export default function MyLi({ href, text }: { href: string; text: string }) {
	return (
		<li className=' mx-2 font-bold'>
			<Link href={href}>{text}</Link>
		</li>
	);
}
