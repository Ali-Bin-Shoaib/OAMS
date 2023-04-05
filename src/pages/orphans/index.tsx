import { GetServerSideProps, GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import { Orphan } from '@prisma/client';

export default function index(props: { data: Orphan[] }) {
	console.log('🚀 ~ file: index.tsx:6 ~ index ~ data:', props.data);

	return <h1 className='text-3xl'>Orphans index</h1>;
}

const getStaticProps: GetServerSideProps = async () => {
	const data = await prisma.orphan.findMany();
	console.log('🚀 ~ file: index.tsx:10 ~ constgetStaticProps:GetStaticProps= ~ data:', data);
	//or
	// const url='http://localhost:3000/orphans'
	// fetch(url).then((res)=>res.json()).then((data)=>data)
	return { props: { data } };
};
