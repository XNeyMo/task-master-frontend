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
		<form onSubmit={onSubmit}>
			<input {...register('email', { required: true })} type="email" placeholder="Email" />
			{errors.email && <p>Email is required</p>}
			<input {...register('password', { required: true })} type="password" placeholder="Password" />
			{errors.password && <p>Password is required</p>}

			<button type="submit">Sign In</button>
		</form>
	)
}
