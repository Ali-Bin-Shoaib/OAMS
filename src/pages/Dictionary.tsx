import { useEffect, useState } from 'react';

function Dictionary() {
	const [word, setWord] = useState('');
	const [word2, setWord2] = useState('');

	useEffect(() => {
		console.log('word state updated', word);
	}, [word]);
	useEffect(() => {
		console.log('word2 state updated', word2);
	}, [word2]);
	return (
		<>
			<input
				type='text'
				name='word'
				id='word'
				onChange={async (e) => {
					setWord(e.target.value);
				}}
			/>

			<h1>
				let{"'"}s get the definition for {word}
			</h1>
			<input
				type='text'
				name='word2'
				id='word2'
				onChange={async (e) => {
					setWord2(e.target.value);
				}}
			/>

			<h1>
				let{"'"}s get the definition for {word2}
			</h1>
		</>
	);
}

export default Dictionary;
