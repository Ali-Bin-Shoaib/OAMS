import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';

interface Props {
	type: HTMLInputTypeAttribute;
	name: string;
	id?: string;
	className?: string;
	value?: any;
	onChange: ChangeEventHandler<HTMLInputElement> | undefined;
	other?: {};
}
function MyInput({
	type,
	name,
	className,
	value,
	other,
	onChange,
}: Props) {
	return (
		<input
			type={type}
			name={name}
			id={name}
			value={value}
			className={`p-2 m-2 hover:shadow-lg  ${className}`}
			onChange={onChange}
		/>
	);
}
export default MyInput;
