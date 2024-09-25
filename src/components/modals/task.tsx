import { useEffect } from "react";
import { useTasks } from "../../context/task";
import { useForm } from "react-hook-form";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: any;
}

export default function TaskModal({ isOpen, onClose, task }: TaskModalProps) {
  const { createTask, updateTask } = useTasks();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const id = task?._id;

  const onSubmit = (data: any) => {
    if (task) {
      updateTask(id, data);
    } else {
      createTask(data);
    }
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  useEffect(() => {
    if (task) {
      setValue("title", task.title);
      setValue("description", task.description);
      setValue("date", task.date ? task.date.split("T")[0] : "");
    } else {
      setValue("title", "");
      setValue("description", "");
      setValue("date", "");
    }
  }, [task, setValue]);

  if (!isOpen) return null;

  return (
    <div className="bg-eminence-950/60 fixed w-full h-full flex items-center justify-center">
      <div className="bg-eminence-50 flex flex-col p-10 rounded-xl w-2/5">
        <div className="flex justify-between items-center">
          <h1 className="uppercase text-xl tracking-widest font-bold text-eminence-950">
            {task ? 'Add new task' : 'Edit task'}
          </h1>
          <button onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="pt-5 w-full flex flex-col gap-5">
          <div>
            <label htmlFor="title" className="block text-lg text-start leading-6 font-bold tracking-widest text-eminence-950">
              Title
            </label>
            <div className="mt-2">
              <input
                {...register("title", { required: "Please enter a title." })}
                id="title"
                name="title"
                type="title"
                required
                autoComplete="title"
                className="px-5 w-full rounded-md border-0 py-1.5 text-eminence-950 shadow-sm ring-1 ring-inset ring-eminence-950 focus:ring-2 focus:ring-inset focus:ring-eminence-700 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-lg text-start leading-6 font-bold tracking-widest text-eminence-950">
              Description
            </label>
            <div className="mt-2">
              <textarea
                {...register("description", { required: "Please enter a description." })}
                id="description"
                name="description"
                required
                autoComplete="current-password"
                className="px-5 w-full rounded-md border-0 py-1.5 text-eminence-950 shadow-sm ring-1 ring-inset ring-eminence-950 focus:ring-2 focus:ring-inset focus:ring-eminence-700 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-eminence-600 px-3 py-1.5 text-sm font-semibold leading-6 text-eminence-100 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
