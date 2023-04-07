export default function MyInput({
	type,
	id,
	defaultValue,
	onChange,
	onClick,
	other,
	text,
	name,
	className,
	value,
}: {
	type: string;
	name: string;
	id?: string;
	defaultValue?: any;
	onChange?: any;
	onClick?: any;
	other?: {};
	text?: string;
	className?: string;
	value?: any;
}) {
	return (
		<div>
			<input
				className={'rounded hover:shadow p-2 m-2 ' + className}
				id={id}
				type={type}
				value={value}
				defaultValue={defaultValue}
				name={name}
				onChange={onChange}
				onClick={onClick}
				{...other}
			/>
			{text}
		</div>
	);
}
