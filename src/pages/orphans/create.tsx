import AppHead from '../../../components/common/AppHead';
import OrphanForm from '../../../components/orphans/orphanForm';
function Create() {
	return (
		<>
			<AppHead title='Add New Orphan' />
			<h1 className='text-3xl'>Create</h1>
			<OrphanForm />
		</>
	);
}
export default Create;
