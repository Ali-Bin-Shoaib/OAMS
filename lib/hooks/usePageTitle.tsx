import { useEffect, useState } from 'react';
// import { Paths, serverLink } from '../shared/links';
import { useRouter } from 'next/router';
import { Paths } from 'shared/links';

export const usePageTitle = () => {
	const [title, setTitle] = useState('OAMS');

	const { asPath } = useRouter();

	useEffect(() => {
		Paths.links.map((link) => {
			if (link.relatedLinks)
				link.relatedLinks.map((x) => {
					if ('http://localhost:3000' + asPath === x.link) {
						setTitle(x.label);
						return title;
					}
				});

			if ('http://localhost:3000' + asPath === link.link) {
				setTitle(link.label);
				return title;
			}
		});
	}, [asPath, title]);

	return asPath === '/' ? 'OAMS' : title;
};
