export default function MyButton({
	text,
	type,
	color,
	onClick,
	other,
	className,
}: {
	text: string;
	type: 'submit' | 'button';
	color: string;
	onClick?: any;
	other?: {};
	className?: string;
}) {
	return (
		<button
			onClick={onClick}
			{...other}
			className={`text-white p-2 m-1 bg-${color}-500 rounded hover:bg-${color}-900 ${className}`}
			type={type}>
			{text}
		</button>
	);
}
