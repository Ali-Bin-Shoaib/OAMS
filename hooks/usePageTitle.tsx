import { useEffect, useState } from 'react';
import { Paths, serverLink } from '../shared/links';
import { useRouter } from 'next/router';

export const usePageTitle = () => {
	const [title, setTitle] = useState('OAMS');

	const { asPath } = useRouter();
	useEffect(() => {
		Paths.links.map((link) => {
			if (link.relatedLinks)
				link.relatedLinks.map((x) => {
					// console.log(
					// 	x.link,
					// 	'http://localhost:3000' + asPath,
					// 	'🚀 ~ file:  ~ x.link:',
					// 	x.link === 'http://localhost:3000' + asPath
					// );

					if ('http://localhost:3000' + asPath === x.link) {
						setTitle(x.label);
						return title;
					}
				});
			// console.log(
			// 	link.link,
			// 	'http://localhost:3000' + asPath,
			// 	'🚀 ~ file:  ~ link.link:',
			// 	link.link === 'http://localhost:3000' + asPath
			// );

			if ('http://localhost:3000' + asPath === link.link) {
				setTitle(link.label);
				return title;
			}
		});
	}, [asPath, title]);

	return title;
};
