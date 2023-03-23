import { useState } from 'react';
import { Modal } from 'react-bootstrap/';
/*
 *this component take employee id,name,role, and handleUpdate function from its parent "Employee component"
 *and make the edit form call the handleUpdate function and pass new name and role to it with the id of Employee
 *handleUpdate will execute on the form is submitted
 */
function AddNewEmployee({ handleAdd }: { handleAdd: any }) {
	const [show, setShow] = useState(false);
	//*defined to change values in update form and to send new values to handleUpdate function.
	const [newName, setNewName] = useState('');
	const [newRole, setNewRole] = useState('');

	const handleClose = () => {
		setShow(false);
	};

	const handleShow = () => setShow(true);
	//*called when the form is submitted. it will invoke handleUpdate function from its parent.
	const handleSubmit = () => {
		handleAdd(newName, newRole);
		setNewName('');
		setNewRole('');
	};
	return (
		<>
			<button
				onClick={handleShow}
				className='bg-stone-500 text-white p-1.5 m1.5 rounded hover:bg-stone-700'>
				Add new Employee
			</button>

			<Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Update Employee info</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form
						//*to prevent the form from restart the page and send a real request to the server.
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit();
						}}
						id='AddEmployeeForm'>
						<label htmlFor='name' id='name'>
							name
						</label>
						<input
							defaultValue={newName}
							placeholder='employee name '
							//*to render changes in name value
							onChange={(e) => {
								setNewName(e.target.value);
							}}
							type='text'
							name='name'
							className='p-1 w-full border rounded '
						/>
						<label htmlFor='role' id='role'>
							role
						</label>
						<input
							onChange={(e) => {
								setNewRole(e.target.value);
							}}
							placeholder='employee role '
							defaultValue={newRole}
							type='text'
							name='role'
							className='p-1 w-full border rounded '
						/>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<button
						onClick={handleClose}
						className='bg-gray-500 m-1.5 text-white p-1.5 rounded hover:bg-gray-700'>
						Close
					</button>

					<button
						//*to make button submit the form with the specified id.
						form='AddEmployeeForm'
						type='submit'
						onClick={handleClose}
						className='bg-stone-500 text-white p-1.5 m1.5 rounded hover:bg-stone-700'>
						Add
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
export default AddNewEmployee;
