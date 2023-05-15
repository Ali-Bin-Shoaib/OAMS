import { ChangeEvent, FormEvent } from 'react';

interface Props {
	initialValues: { name: string; value: string };
	onSubmit: () => void;
}
export default function Form<T>({ initialValues, onSubmit }: Props) {
	// ...

	// Render the form fields
	const formFields = Object.entries(initialValues).map(([name, value]) => (
		<input key={name} type='text' name={name} value={value} onChange={handleChange} />
	));

	// Render the submit button
	const submitButton = <button type='submit'>Submit</button>;

	function handleSubmit(event: FormEvent<HTMLFormElement>): void {
		onSubmit();
	}

	// Return the form
	return (
		<form onSubmit={handleSubmit}>
			{formFields}
			{submitButton}
		</form>
	);
}
function handleChange(event: ChangeEvent<HTMLInputElement>): void {
	console.log('change');
}
