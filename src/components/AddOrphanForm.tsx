import React from 'react';
import MyButton from './MyButton';
import { v4 } from 'uuid';
import MyInput from './MyInput';
import {
	Box,
	FormControl,
	FormHelperText,
	Input,
	InputAdornment,
	InputLabel,
	TextField,
} from '@mui/material';
import MyTextField from './MyTextField';
import MyRadioGroup from './MyRadioGroup';

function AddOrphanForm() {
	return (
		<form action='post'>
			<h1 className='text-2xl font-bold'>AddOrphanForm</h1>
			<Box>
				<MyTextField id='name' label='name' />
				<MyRadioGroup />
				<TextField type='date' label="birthdate" id='birthdate' variant='outlined' />

				<MyTextField id='birthplace' label='birthplace' />
				
				<MyTextField id='mother name' label='mother name' />
				<MyTextField id='current address' label='current address' />
				<MyTextField id='mother job' label='mother job' />
				<MyTextField id='live with' label='live with' />
				<br />
				<MyButton text='submit' type='submit' key={v4()} />
			</Box>
		</form>
	);
}

export default AddOrphanForm;
