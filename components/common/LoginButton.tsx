import { useSession, signIn, signOut } from 'next-auth/react';

export default function LoginButton() {
	const { data: session } = useSession();
	console.log('🚀 ~ file: LoginButton.tsx:5 ~ LoginButton ~ session:', session);
	if (session) {
		return (
			<>
				Signed in as {session?.user?.email} <br />
				<button onClick={() => signOut()}>Sign out</button>
			</>
		);
	}
	return (
		<>
			Not signed in <br />
			<button onClick={() => signIn()}>Sign in</button>
		</>
	);
}
