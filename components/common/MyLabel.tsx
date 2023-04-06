export default function MyLabel({
	text,
	children,
}: {
	text: string;
	children?: JSX.Element | any;
}) {
	return (
		<div className=' p-2 border rounded-xl m-2'>
			<label className='p-1 w-full block' htmlFor={text}>
				{text}
			</label>
			<div className='w-auto rounded hover:shadow-lg'>{children}</div>
		</div>
	);
}
