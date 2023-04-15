interface Props {
	htmlFor: string;
	text: string;
	className?: string;
}
function MyLabel({ htmlFor, text, className }: Props) {
	return (
		<label htmlFor={htmlFor} className={`m-1 p-1 ${className}`}>
			{text}:{' '}
		</label>
	);
}
export default MyLabel;
