import React, { MouseEventHandler } from 'react';

function MyButton({ value = 'button' }, event: any) {
	console.log('🚀 ---------------------------------------------------🚀');
	console.log('🚀 ~ file: MyButton.tsx:4 ~ MyButton ~ event:', event);
	console.log('🚀 ---------------------------------------------------🚀');
	return (
		<>
			<button className='border rounded bg-stone-500 text-white'>{value}</button>
		</>
	);
}

export default MyButton;
