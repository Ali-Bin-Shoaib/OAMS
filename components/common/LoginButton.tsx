import { useSession, signIn, signOut } from 'next-auth/react';

export default function LoginButton() {
	const { data: session } = useSession();
	console.log('🚀 ~ file: LoginButton.tsx:5 ~ LoginButton ~ session:', session);
	if (session) {
		return (
			<>
				 {session?.user?.email} <br />
				<button onClick={() => signOut()}>تسجيل الخروج</button>
			</>
		);
	}
	return (
		<>
			لم يتم تسجيل الدخول <br />
			<button onClick={() => signIn()}>تسجيل الدخول</button>
		</>
	);
}
