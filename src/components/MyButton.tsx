type props = {
	color:| string;
	text: string;
    classes?:string
	type?: 'submit' | 'button' | undefined;
};
export default function MyButton(props: props) {
	return (
		<button
			type={props.type}
			className={`p-2  rounded bg-${props.color}-500 text-white hover:bg-${props.color}-900 ${props.classes}`}>
			{props.text}
		</button>
	);
}
