import { useState } from 'react';
import { URL } from '../../../shared/links';
import { FileInput } from '@mantine/core';
import Image from 'next/image';

function Test() {
	function sendImage(image: File) {
		fetch(URL + 'api/orphan/test', { method: 'post', headers: { 'Content-Type': 'application-json' }, body: image });
	}
	const [image, setImage] = useState<File>();
	return (
		<>
			<FileInput
				label='choose an image'
				onChange={(e) => {
					e ? sendImage(e) : '';
				}}
			/>
			<Image src={''} alt={'img'} width={250} height={250} />
		</>
	);
}
export default Test;
