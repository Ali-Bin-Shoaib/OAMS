import Link from 'next/link';
import React from 'react';
import {v4} from 'uuid';

function MyLink({ path, text }: { path: string; text: string }) {
	return (
		<Link className='p-2 m-0 bg-sky-500 text-white hover:bg-sky-800  rounded-b' href={path} key={v4()}>
			{text}
		</Link>
	);
}

export default MyLink;
