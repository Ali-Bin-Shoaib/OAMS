import Image from 'next/image';
import React from 'react';
import EditEmployeeForm from './EditEmployeeForm';
//*take employee values and handleUpdate function form its parent.
function Employee({
	id,
	name,
	role,
	img,
	handleUpdate,
}: {
	id: string;
	name: string;
	role: string;
	img: string;
	handleUpdate: any;
}) {
	return (
		<>
			<div className='py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6'>
				<Image
					priority
					width={100}
					height={100}
					className='w-auto h-auto block mx-auto  rounded-full object-cover sm:mx-0 sm:shrink-0'
					src={img}
					alt='emp image'
				/>
				<div className='text-center space-y-2 sm:text-left'>
					<div className='space-y-0.5'>
						<p className='text-lg text-black font-semibold'>{name}</p>
						<p className='text-slate-500 font-medium'>{role}</p>
					</div>
					{/*pass needed values to the editEmployee component with handleUpdate function that will update the 
					employee list in index component with new values. */}
					<EditEmployeeForm id={id} name={name} role={role} handleUpdate={handleUpdate} />
				</div>
			</div>
		</>
	);
}
// Employee.defaultProps={name:'emp',age:-1,salary:-1}

export default Employee;
