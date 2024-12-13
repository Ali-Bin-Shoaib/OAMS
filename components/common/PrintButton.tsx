import { Button, Tooltip } from '@mantine/core';
import { IconPrinter } from '@tabler/icons-react';
import { MRT_TableInstance } from 'mantine-react-table';
import { useState } from 'react';
import ReactToPrint from 'react-to-print';
interface Props {
	handlePrint: (value: boolean) => void;
	table: MRT_TableInstance<any>;
}
const PrintButton = ({ table, handlePrint }: Props) => {
	return (
		<div>
			<ReactToPrint
				pageStyle={'landscape'}
				trigger={() => (
					<Tooltip label='طباعة'>
						<Button>
							<IconPrinter />
						</Button>
					</Tooltip>
				)}
				content={() => {
					return table.refs.tableContainerRef.current;
				}}
				onBeforeGetContent={() => {
					handlePrint(true);
				}}
				onAfterPrint={() => {
					handlePrint(false);
				}}
			/>
		</div>
	);
};
export default PrintButton;
