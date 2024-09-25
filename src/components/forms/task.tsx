import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../../context/task";
import { useForm } from "react-hook-form";

export function TaskForm() {
	const { createTask, getTask, updateTask } = useTasks();
	const navigate = useNavigate();
	const params = useParams();
	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data: any) => {
		try {
			if (params.id) {
				updateTask(params.id, {
					...data,
				});
			} else {
				createTask({
					...data,
				});
			}

			// navigate("/tasks");
		} catch (error) {
			console.error(error);
			// window.location.href = "/";
		}
	};

	useEffect(() => {
		const loadTask = async () => {
			if (params.id) {
				const task = await getTask(params.id);
				setValue("title", task.title);
				setValue("description", task.description);
				setValue("date", task.date ? task.date.split("T")[0] : "");
			}
		};
		loadTask();
	}, [params.id, getTask, setValue]);

	return (
		<div className="card">
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="title">Title</label>
				<input
					type="text"
					name="title"
					placeholder="Title"
					{...register("title", { required: "Please enter a title." })}
					autoFocus
				/>
				{errors.title && (
					<p className="text-red-500 text-xs italic">{errors.title.message}</p>
				)}

				<label htmlFor="description">Description</label>
				<textarea
					name="description"
					id="description"
					rows={3}
					placeholder="Description"
					{...register("description")}
				></textarea>

				<label htmlFor="date">Date</label>
				<input type="date" name="date" {...register("date")} />

				<button type="submit">Save</button>
			</form>
		</div>
	);
}

export default TaskForm;
