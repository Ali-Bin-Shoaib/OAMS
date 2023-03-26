import { v4 } from 'uuid';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import NotFound from '../notFound';
import DefinitionSearch from '@/components/DefinitionSearch';
export default function Word() {
	const router = useRouter();
	const { search } = router.query;
	const [word, setWord] = useState([]);
	const [notFound, setNotFound] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + search;
		// const url = 'https://httpstat.us/500';
		// const url = 'https://fsdasdfasdfasadfd.com';
		fetch(url)
			.then((response) => {
				if (response.status === 404) {
					setNotFound(true);
				} else if (response.status === 401) {
					router.push('/login');
				} else if (response.status === 500) {
					setError(true);
				}
				if (!response.ok) {
					setError(true);
					throw new Error('++Something went wrong.');
				}
				return response.json();
			})
			.then((data) => {
				setWord(data[0].meanings);
				// console.log('🚀 ~ file: [search].tsx:36 ~ data[0].meanings:', data[0].meanings);
			})
			.catch((e) => {
				console.log('🚀 ~ file: [search].tsx:37 ~ e:', e);
			});
	}, [router, search]);
	// console.log("🚀 ~ file: [search].tsx:42 ~ error:", error);

	if (notFound === true) {
		return (
			<>
				<p>can{"'"}t find {search}</p>
				<Link href={'/dictionary'}>search another</Link>
			</>
		);
	}
	if (error === true) {
		return (
			<>
				<p>Something went wrong try agin?</p>
				<Link href={'/dictionary'}>search another</Link>
			</>
		);
	}
	return (
		<>
			{search ? <h1>Here is a {'"' + search + '"'} Definition</h1> : <h1>no search word.</h1>}
			{word ? (
				<>
					{word.map((meaning: any) => {
						return (
							<h4 key={v4()}>
								{meaning.partOfSpeech + ' : '}
								{meaning.definitions[0].definition}
							</h4>
						);
					})}
					<p>Search agin:</p>
					<DefinitionSearch />
				</>
			) : null}
		</>
	);
}
