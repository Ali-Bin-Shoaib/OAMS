import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function Copyright() {
	return (
		<Typography variant='body2' color='text.secondary' align='center'>
			{'Copyright © '}
			<Link className='underline' href='https://mui.com/'>
				OAMS
			</Link>
			{new Date().getFullYear()}.
		</Typography>
	);
}
