import React, { MouseEventHandler } from 'react';

function MyButton({ value = 'button' }, event: any) {
	return (
		<>
			<button className='border rounded bg-stone-500 text-white'>{value}</button>
		</>
	);
}

export default MyButton;
