import Employee from '@/components/Employee';
import { useState } from 'react';
import { v4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';

import AddNewEmployee from '@/components/AddNewEmployee';

export default function Home({
	params,
	searchParams,
}: {
	params: { slug: string };
	searchParams?: { [key: string]: string | string[] | undefined };
}) {
	const employees = [
		{ id: v4(), name: 'ali', role: 'dev', img: '/../public/img/1.jpg' },
		{ id: v4(), name: 'ahmad', role: 'dev', img: '/../public/img/2.jpg' },
		{ id: v4(), name: 'dha', role: 'dev', img: '/../public/img/3.jpg' },
		{ id: v4(), name: 'nasser', role: 'dev', img: '/../public/img/4.jpg' },
		{ id: v4(), name: 'nor', role: 'dev', img: '/../public/img/5.jpg' },
		{ id: v4(), name: 'ali', role: 'dev', img: '/../public/img/6.jpg' },
		{ id: v4(), name: 'ahmed', role: 'dev', img: '/../public/img/7.jpg' },
		{ id: v4(), name: 'haddar', role: 'dev', img: '/../public/img/8.jpg' },
		{ id: v4(), name: 'hossain', role: 'dev', img: '/../public/img/1.jpg' },
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
	return (
		<>
			<h1 className='text-3xl'>Home page</h1>
			<button
				className='border p-1.5 m-1.5 rounded bg-stone-500 hover:bg-stone-700 text-white'
				onClick={() => setShow(!show)}>
				show Employee info
			</button>

			<AddNewEmployee handleAdd={handleAdd} />
			<div className={'flex flex-wrap '}>
				{show ? (
					<>
						{/*return an employee component and passing employee values to it with handleUpdate function
							that will handle update of employee values.*/}
						{employeeList.map((emp) => {
							console.log("🚀 ~ file: index.tsx:76 ~ {employeeList.map ~ emp:", emp)
							return (
								<Employee
									key={emp.id}
									id={emp.id}
									name={emp.name}
									role={emp.role}
									img={emp.img}
									handleUpdate={handleUpdate}
								/>
							);
						})}
					</>
				) : (
					<p>nothing</p>
				)}
			</div>
		</>
	);
}
