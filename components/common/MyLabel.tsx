export default function MyLabel({
	text,
	children,
}: {
	text: string;
	children?: JSX.Element | any;
}) {
	return (
		<label className='p-2 m-2 bg-slate-100  border' htmlFor={text}>
			{text}
			{children}
		</label>
	);
}
