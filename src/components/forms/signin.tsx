import { useForm } from "react-hook-form"
import { useAuth } from "../../context/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignInForm() {
	const { register, handleSubmit, formState: { errors } } = useForm()
	const { signIn, isAuthenticated } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) navigate('/')
	}, [isAuthenticated]);

	const onSubmit = handleSubmit((values) => signIn(values));

	return (
		<form className="flex flex-col gap-5" onSubmit={onSubmit}>
			<input
				{...register('email', { required: true })}
				type="email"
				placeholder="Email"
				className="border-2 focus:outline-none text-eminence-600 focus:border-eminence-800 placeholder:text-eminence-400 focus:text-eminence-800 border-eminence-600 bg-eminence-50 p-2 rounded-md"
			/>

			<input
				{...register('password', { required: true })}
				type="password"
				placeholder="Password"
				className="border-2 focus:outline-none text-eminence-600 focus:border-eminence-800 placeholder:text-eminence-400 focus:text-eminence-800 border-eminence-600 bg-eminence-50 p-2 rounded-md"
			/>

			<button className="hover:bg-eminence-800 ease-in-out duration-500 bg-eminence-600 p-2 rounded-md font-bold text-eminence-50" type="submit">
				Sign In
			</button>
		</form>
	)
}
