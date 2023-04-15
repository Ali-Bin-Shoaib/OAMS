import AppHead from '../../../components/common/AppHead';
import OrphanForm from '../../../components/orphans/orphanForm';
import Test from '../../../components/orphans/Test';
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
