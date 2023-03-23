import Link from 'next/link';
import React from 'react';

function MyLink({ path, text }: { path: string; text: string }) {
	return (
		<Link className='p-2 m-0 border no-underline text-white ' href={path}>
			{text}
		</Link>
	);
}

export default MyLink;
