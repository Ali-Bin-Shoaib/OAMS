import { GetServerSideProps, GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import { Orphan } from '@prisma/client';

export default function index({ data }: { data: Orphan[] }) {
	return (
		<>
			<h1 className='text-3xl'>Orphans index</h1>
			{data.length === 0 ? <p>no orphan registered</p> : <p>no of orphans {data.length}</p>}
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const data = await prisma.orphan.findMany();
	//or
	// const url='http://localhost:3000/orphans'
	// fetch(url).then((res)=>res.json()).then((data)=>data)
	return { props: { data } };
};
