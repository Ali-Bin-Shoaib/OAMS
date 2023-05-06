import { useEffect, useState } from 'react';
import Image from 'next/image';
import { serverLink } from '../../../shared/links';
import axios from 'axios';
import { v4 } from 'uuid';

function Test() {
	let [count, setCount] = useState(-1);
	const [image, setImage] = useState<File | null>(null);
	const [src, setSrc] = useState<string[]>([]);
	async function sendImage(image: File) {
		const formData = new FormData();
		formData.append('image', image);

		await axios
			.post(serverLink + 'api/orphan/test', formData)
			.then((res) => {
				setCount(count++);
				console.log('🚀 ~ file: Test.tsx:17 ~ .then ~ count:', count);
				console.log('file uploaded success', res.data.files.image);
				setSrc(src?.concat(URL.createObjectURL(image)));
			})
			.catch((err) => console.log('error uploaded file', err));
	}
	useEffect(() => {
		if (image) setSrc(src?.concat(URL.createObjectURL(image)));
	}, [image]);
	console.log('🚀 ~ file: Test.tsx:26 ~ useEffect ~ src:', src);

	return (
		<>
			<input
				type='file'
				onChange={(e) => {
					e.target.files ? sendImage(e.target.files[0]) : console.log('no image');
				}}
			/>
			{!(src?.length < 0) && src?.map((x) => <Image key={v4()} src={x} alt={'img'} width={250} height={250} />)}
		</>
	);
}
export default Test;
