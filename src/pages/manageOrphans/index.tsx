import { useEffect, useState } from 'react';
import { ORPHAN } from '../../../types/types';

export default function ManageOrphan() {
	const [data, setData] = useState([]);
	useEffect(() => {
		fetch('/api/hello')
			.then((res) => res.json())
			.then((data) => setData(data))
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<>
			<h1>ManageOrphan</h1>
			<ul>
				{data.map((orphan: ORPHAN) => {
					if (orphan.birthdate != null)
						return (
							<li key={orphan.id} className='inline-flex'>
								<div className='border shadow p-2 m-2 '>
									<p>{orphan.id}</p>
									<p> {orphan.name}</p>
									<p>{orphan.gender}</p>
									<p>{new Date(orphan.birthdate).toDateString()}</p>
									<p>{new Date(orphan.joinDate).toLocaleString()}</p>
									{/* <p>{orphan.birthplace}</p> */}
									{/* <p>{orphan.currentAddress}</p> */}
									{/* <p>{Number(orphan.evaluation)}</p> */}
									{/* <p>{orphan.fatherDeathDate.toISOString()}</p> */}
									{/* <p>{Boolean(orphan.isMotherWorks)}</p> */}
									{/* <p>{orphan.liveWith}</p>
								<p>{orphan.motherJob}</p>
								<p>{orphan.motherName}</p> */}
								</div>
							</li>
						);
				})}
			</ul>
		</>
	);
}
const data = async () => {
	const res = await fetch('/api/hello', {
		method: 'get',
		headers: { 'Content-Type': 'application/json' },
	});
	const data = await res.json();
	return data;
};
