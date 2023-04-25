/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
};
// const nextTranslate = require('next-translate-plugin');

module.exports = nextConfig;
// module.exports = nextTranslate();
module.exports = {
	experimental: {
		swcPlugins: [
			[
				'next-superjson-plugin',
				{
					excluded: [],
				},
			],
		],
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '',
				port: '',
				pathname: '/**',
			},
		],
	},
};
