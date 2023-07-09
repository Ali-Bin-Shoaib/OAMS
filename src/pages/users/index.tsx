import { GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import AppHead from '../../../components/common/AppHead';
import { useEffect, useState } from 'react';
import { Loader } from '@mantine/core';
import SuperJSON from 'superjson';
import { _Orphan, _User } from '../../../types';
import { usePageTitle } from '../../../hooks/usePageTitle';
import MyModal from '../../../components/common/MyModal';
import UserForm from '../../../components/users/UserForm';
import { useDisclosure } from '@mantine/hooks';
import UserTable from '../../../components/users/UserTable';
import { CreateUser } from '../../../utils/CreateEntries';

// * get orphans from database and pass the result as props to Index page.
export const getStaticProps: GetStaticProps = async () => {
	const users = await prisma.user.findMany({ where: { type: { notIn: ['SPONSOR', 'GUARDIAN'] } } });

	users.sort(function (a, b) {
		return a.id > b.id ? 1 : -1;
	});

	const stringUsers = SuperJSON.stringify(users);
	return { props: { stringUsers } };
};

interface Props {
	stringUsers: string;
}
export default function Index({ stringUsers }: Props) {
	console.log('UsersList Index');
	const jsonUsers: _User[] = SuperJSON.parse(stringUsers);
	const [users, setUsers] = useState<_User[]>(jsonUsers);
	const [cardInfo, setCardInfo] = useState<_User>(jsonUsers[0]);
	const [hydration, setHydration] = useState(false);
	const updateCard = (user: _User) => setCardInfo(user);
	const [opened, { open, close }] = useDisclosure(false);
	const title = usePageTitle();
	useEffect(() => {
		setUsers(SuperJSON.parse(stringUsers));
		setHydration(true);
	}, [hydration, stringUsers]);

	if (!hydration || !jsonUsers) return <Loader size={100} />;
	return (
		<>
			<AppHead title={title} />
			<div className='text-center pb-4'>
				<MyModal
					modalTitle='Add User'
					buttonText='Add New User'
					// close={close}
					// open={open}
					// opened={opened}
					ModelForm={<UserForm close={close} />}
				/>
			</div>
			<UserTable users={users} updateCard={updateCard} />
		</>
	);
}
