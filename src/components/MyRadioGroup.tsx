import { FormControl, FormControlLabel, Radio, RadioGroup, FormLabel, Box } from '@mui/material';
import React from 'react';

function MyRadioGroup() {
	return (
		<Box>
			<FormControl>
				<FormLabel id='demo-row-radio-buttons-group-label'>Gender</FormLabel>
				<RadioGroup
					row
					aria-labelledby='demo-row-radio-buttons-group-label'
					name='row-radio-buttons-group'>
					<FormControlLabel value='female' control={<Radio />} label='Female' />
					<FormControlLabel value='male' control={<Radio />} label='Male' />
				</RadioGroup>
			</FormControl>
		</Box>
	);
}

export default MyRadioGroup;
