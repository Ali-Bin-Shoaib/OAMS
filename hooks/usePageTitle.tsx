import { useEffect, useState } from 'react';
import { Paths } from '../shared/links';
import { useRouter } from 'next/router';

export const usePageTitle = () => {
	const [title, setTitle] = useState('OAMS');

	const router = useRouter();
	useEffect(() => {
		Paths.links.map((link) => {
			if (link.link === router.asPath) setTitle(link.label);
		});
	}, [router.asPath]);

	return title;
};
