import { useState } from 'react';
import { Modal } from 'react-bootstrap/';
/*
 *this component take employee id,name,role, and handleUpdate function from its parent "Employee component"
 *and make the edit form call the handleUpdate function and pass new name and role to it with the id of Employee
 *handleUpdate will execute on the form is submitted
 */
function EditEmployeeForm({
	id,
	name,
	role,
	handleUpdate,
}: {
	id: string;
	name: string;
	role: string;
	handleUpdate: any;
}) {
	const [show, setShow] = useState(false);
	//*defined to change values in update form and to send new values to handleUpdate function.
	const [newName, setNewName] = useState(name);
	const [newRole, setNewRole] = useState(role);

	const handleClose = () => {
		setShow(false);
		
	};
	const handleShow = () => setShow(true);
	//*called when the form is submitted. it will invoke handleUpdate function from its parent.
	const handleSubmit = () => {
		handleUpdate(id, newName, newRole);
		// setNewName('');
		// setNewRole('');
	};
	return (
		<>
			<button
				onClick={handleShow}
				className='px-4 py-1 text-sm text-stone-600 font-semibold rounded border border-stone-200 hover:text-white hover:bg-stone-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-stone-600 focus:ring-offset-2'>
				Edit
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
						id='updateEmployeeForm'>
						<label htmlFor='name' id='name'>
							name
						</label>
						<input
							defaultValue={newName}
							//*to render changes in name value
							onChange={(e) => {
								setNewName(e.target.value);
							}}
							type='text'
							name='name'
							className='p-1 w-full border rounded border-fuchsia-500'
						/>
						<label htmlFor='role' id='role'>
							role
						</label>
						<input
							onChange={(e) => {
								setNewRole(e.target.value);
							}}
							defaultValue={newRole}
							type='text'
							name='role'
							className='p-1 w-full border rounded border-fuchsia-500'
						/>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<button onClick={handleClose} className='bg-gray-500 text-white p-1.5 rounded'>
						Close
					</button>

					<button
						//*to make button submit the form with the specified id.
						form='updateEmployeeForm'
						type='submit'
						onClick={handleClose}
						className='bg-stone-600 text-white p-1.5 rounded'>
						Update
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
export default EditEmployeeForm;
