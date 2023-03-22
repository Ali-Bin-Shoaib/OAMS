import { TextField } from '@mui/material';
import React from 'react';

// function MyTextField({ id, label, errMsg }: { id: string; label: string; errMsg: string }) {
function MyTextField({ id, label }: { id: string; label: string }) {
	return <TextField id={id} label={label} required variant='outlined'/>;
}

export default MyTextField;
