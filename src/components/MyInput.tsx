import MyLabel from './MyLabel';

export default function MyInput({ text, type, value }: { text: string; type: string; value?: string }) {
	return (
		<>
			<div className='text-start  '>
				<MyLabel text={text} />
				<input className='rounded p-1 m-1 hover:shadow-xl' type={type} defaultValue={value}  name={text} id={text} />
			</div>
		</>
	);
}
