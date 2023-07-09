import { useEffect, useState } from 'react';
import { Paths } from '../shared/links';
import { useRouter } from 'next/router';

export const usePageTitle = () => {
	const [title, setTitle] = useState('OAMS');

	const router = useRouter();
	useEffect(() => {
		Paths.links.map((link) => {
			if (link.relatedLinks)
				link.relatedLinks.map((x) => {
					if (router.asPath.includes(x.link.toLowerCase())) {
						setTitle(x.label);
						return title;
					}
				});
			if (router.asPath.includes(link.label.toLowerCase())) {
				setTitle(link.label);
				return title;
			}
		});
	}, [router.asPath, title]);

	return title;
};
