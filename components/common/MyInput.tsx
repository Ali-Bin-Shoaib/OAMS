export default function MyInput({ text = 'any', type = 'text' }) {
	if (type == 'text')
		return (
			<div className=' p-2 border rounded-xl m-2'>
				<label className='p-1' htmlFor={text}>
					{text}
				</label>
				<input
					className='w-auto rounded hover:shadow-lg'
					type={type}
					defaultValue={text}
					placeholder={'Enter ' + text}
				/>
			</div>
		);
	else
		return (
			<div className=' p-2 border rounded-xl m-2'>
				<label className='p-1' htmlFor={text}>
					{text}
				</label>
				<input className='w-auto rounded hover:shadow-lg' type={type} placeholder={'Enter ' + text} />
			</div>
		);
}
