import { Orphan } from '@prisma/client';
import { _Orphan } from '../../types/types';
import { Checkbox } from '@mantine/core';

interface Props {
	orphan: _Orphan;
}
function OrphanAttendanceComponent({ orphan }: Props) {
	return (
		<>
			<td>{orphan.id}</td>

			<td>{orphan.name}</td>
			<td>
				<Checkbox />
			</td>
		</>
	);
}
export default OrphanAttendanceComponent;
