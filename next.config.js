/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
};
// const nextTranslate = require('next-translate-plugin');

module.exports = nextConfig;
// module.exports = nextTranslate();
module.exports = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'www.amazon.com',
				port: '',
				pathname: '/Best-Sellers-Books/zgbs/books/**',
			},
		],
	},
};
