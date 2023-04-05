export default function MyButton({
	text,
	type,
	color,
}: {
	text: string;
	type: 'submit' | 'button';
	color: string;
}) {
	return (
		<div>
			<button
				className={`text-white p-2 m-1 bg-${color}-500 rounded hover:bg-${color}-900`}
				type={type}>
				{text}
			</button>
		</div>
	);
}
