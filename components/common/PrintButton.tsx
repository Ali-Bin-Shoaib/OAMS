import { Button, Tooltip } from '@mantine/core';
import { IconPrinter } from '@tabler/icons-react';
import ReactToPrint from 'react-to-print';

const PrintButton = ({ printRef }: { printRef: React.RefObject<any> }) => {
	return (
		<div>
			<ReactToPrint
				trigger={() => (
					<Tooltip label='Print'>
						<Button>
							<IconPrinter />
						</Button>
					</Tooltip>
				)}
				content={() => printRef.current}
			/>
		</div>
	);
};
export default PrintButton;
