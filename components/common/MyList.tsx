import { useState } from 'react';
import { List, Text, Card, Button } from '@mantine/core';

interface Props {
	data: { id: number; name: string; image?: unknown; info?: string[] }[];
}
function MyList({ data }: Props) {
	const [selectedItemId, setSelectedItemId] = useState(null);

	const handleItemClick = (itemId) => {
		setSelectedItemId(itemId);
	};

	const selectedItem = data.find((x) => x.id === selectedItemId);

	return (
		<div className='flex h-screen p-6'>
			<List
				style={{
					border: '1px solid #ccc',
					borderRadius: '8px',
					padding: '16px',
					boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
					width: '1/3',
				}}>
				{data.map((item) => (
					<List.Item
						key={item.id}
						onClick={() => handleItemClick(item.id)}
						className={`p-4 cursor-pointer transition-colors duration-200 ${
							item.id === selectedItemId ? 'bg-gray-300' : ''
						}`}>
						{item.name}
					</List.Item>
				))}
			</List>
			<div className='flex-1 ml-6'>
				{selectedItem ? (
					<Card shadow='sm' radius='md' className='bg-white rounded-lg shadow-lg p-6 flex flex-col'>
						<div className='mb-4'>
							<Text weight={600} size='lg'>
								{selectedItem.name}
							</Text>
						</div>
						<div className='mb-8'>
							<Text size='sm'>{selectedItem?.info[0]}</Text>
						</div>
						<div className='flex justify-end'>
							<Button
								size='sm'
								variant='outline'
								className='bg-blue-500 text-white rounded-md px-4 py-2 mt-4 hover:bg-blue-600'>
								Edit
							</Button>
						</div>
					</Card>
				) : (
					<Text className='text-gray-700'>Select an item to view details</Text>
				)}
			</div>
		</div>
	);
}

export default MyList;
