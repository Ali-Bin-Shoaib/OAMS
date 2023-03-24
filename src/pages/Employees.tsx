import AddNewEmployee from '@/components/AddNewEmployee';
import EditEmployeeForm from '@/components/EditEmployeeForm';
import Employee from '@/components/Employee';
import React, { useState } from 'react';
import { v4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';

function Employees() {
	const employees = [
		{ id: v4(), name: 'ali', role: 'dev', img: '/../public/img/1.jpg' },
		{ id: v4(), name: 'ahmad', role: 'dev', img: '/../public/img/2.jpg' },
		{ id: v4(), name: 'dha', role: 'dev', img: '/../public/img/3.jpg' },
		{ id: v4(), name: 'nasser', role: 'dev', img: '/../public/img/4.jpg' },
		{ id: v4(), name: 'nor', role: 'dev', img: '/../public/img/5.jpg' },
		{ id: v4(), name: 'ali', role: 'dev', img: '/../public/img/6.jpg' },
		{ id: v4(), name: 'ahmed', role: 'dev', img: '/../public/img/7.jpg' },
		{ id: v4(), name: 'haddar', role: 'dev', img: '/../public/img/8.jpg' },
	];
	const [employeeList, setEmployeeList] = useState(employees);
	const [show, setShow] = useState(true);

	//*will be called from editEmployee component to update employeeList with update values from editEmployee
	const handleUpdate = (id: string, newName: string, newRole: string) => {
		const newEmpList = employeeList.map((emp) => {
			//*return the update employee with its new name and role using his id.
			if (emp.id === id) return { ...emp, name: newName, role: newRole };
			return emp;
		});

		//*change the state of employeeList by using setEmployee with new List.
		setEmployeeList(newEmpList);
	};
	const handleAdd = (name = 'new', role = 'new', img = '/../public/img/1.jpg') => {
		const newEmployee = { id: v4(), name: name, role: role, img: img };
		setEmployeeList([...employeeList, newEmployee]);
	};
	// const addNewEmployee = <AddNewEmployee handleAdd={handleAdd} />;
	return (
		<>
			<div className='flex flex-wrap  m-2 p-2 '>
				<>
					{employeeList.map((emp) => {
                        const editEmployee = (
							<EditEmployeeForm
								key={emp.id}
								id={emp.id}
								name={emp.name}
								role={emp.role}
								handleUpdate={handleUpdate}
                                />
                                );
                                return (
                                    <Employee
								key={emp.id}
								id={emp.id}
								name={emp.name}
								role={emp.role}
								img={emp.img}
								// handleUpdate={handleUpdate}
								editEmployee={editEmployee}
                                />
                                );
                            })}
				</>
			</div>
			<div className='text-center '>
                            {/* {addNewEmployee} */}
				<AddNewEmployee handleAdd={handleAdd} />
			</div>
		</>
	);
}
export default Employees;
