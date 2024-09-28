import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FieldErrors, useForm, SubmitHandler } from "react-hook-form"
import { notifications } from "@mantine/notifications";

import { IconX, IconCheck } from "@tabler/icons-react";

import { useAuth } from "../../hooks/useAuth";

import { User } from "../../types";

export default function SignUpForm() {
	const { register, handleSubmit } = useForm<User>()
	const { signUp, isAuthenticated } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) navigate('/')
	}, [isAuthenticated, navigate]);

	const onSubmit: SubmitHandler<User> = async (values) => {
		notifications.show({
			loading: true,
			title: 'Creating Account',
			message: 'Please wait...',
			color: 'blue',
			id: 'sign-in',
		});

		try {
			await signUp(values);

			setTimeout(() => {
				notifications.update({
					loading: false,
					icon: <IconCheck />,
					title: 'Account Created',
					message: 'Signed In',
					color: 'green',
					id: 'sign-in',
				});
			}, 1000);
		} catch (error) {
			setTimeout(() => {
				notifications.update({
					loading: false,
					icon: <IconX />,
					title: 'Error',
					message: (error as Error).message,
					color: 'red',
					id: 'sign-in',
				});
			}, 1000);
		}
	};

	const onError = (errors: FieldErrors) => {
		if (errors.username) {
			notifications.show({
				title: 'Error',
				message: 'Email is required',
				color: 'red',
			});
		}

		if (errors.email) {
			notifications.show({
				title: 'Error',
				message: 'Email is required',
				color: 'red',
			});
		}

		if (errors.password) {
			notifications.show({
				title: 'Error',
				message: 'Password is required',
				color: 'red',
			});
		}
	}

	return (
		<form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit, onError)}>
			<input
				{...register('username', { required: true })}
				type="text"
				placeholder="Username"
				className="border-2 focus:outline-none text-eminence-600 focus:border-eminence-800 placeholder:text-eminence-400 focus:text-eminence-800 border-eminence-600 bg-eminence-50 p-2 rounded-md"
			/>

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
				Sign Up
			</button>
		</form>
	)
}
