import { Orphan } from '@prisma/client';
import { _Orphan, _Attendance } from '../../types/types';
import { Checkbox } from '@mantine/core';
import { v4 } from 'uuid';

interface Props {
	orphan?: _Orphan;
	attendance?: _Attendance;
	Controller: any;
}
function OrphanAttendanceComponent({ orphan, attendance, Controller }: Props) {
	return (
		<>
			{attendance?.OrphanAttendance.map((oa) => {
				return '';
			})}
		</>
	);
}
export default OrphanAttendanceComponent;
