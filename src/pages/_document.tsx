import { Head, Html, Main, NextScript } from 'next/document';
import { createGetInitialProps } from '@mantine/next';
const GetInitialProps = createGetInitialProps();

export default function Document() {
	const getInitialProps = GetInitialProps;

	return (
		<Html lang='en'>
			<Head />
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
// export default class _Document extends Document {
// 	static getInitialProps = getInitialProps;

// 	render() {
// 		return (
// 			<Html>
// 				<Head />
// 				<body>
// 					<Main />
// 					<NextScript />
// 				</body>
// 			</Html>
// 		);
// 	}
// }
