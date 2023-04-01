import { ReactElement, ReactNode } from "react";
		{
			/* props: { children: JSX.Element } */
		}

export default function MyLabel(props: { children?: JSX.Element; text: string }) {
	return (
		<label className='rounded p-1 m-1 bg-slate-50 shadow' htmlFor={props.text}>
			{props.text}
			{props.children}
		</label>
	);
}
