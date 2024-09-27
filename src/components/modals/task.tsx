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
    }, 10000);
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
    <div className="bg-eminence-900/60 fixed w-full h-full flex items-center justify-center">
      <div className="bg-eminence-50 flex flex-col p-10 rounded-xl w-2/5">
        <div className="flex justify-between items-center">
          <h1 className="uppercase text-xl tracking-widest font-bold text-eminence-600">
            {task ? 'Add new task' : 'Edit task'}
          </h1>
          <button
            onClick={onClose}
            className="text-[#F87171] hover:text-[#DC2626] ease-in-out duration-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="pt-5 w-full flex flex-col gap-5">
          <div>
            <label htmlFor="title" className="block text-lg text-start leading-6 font-bold tracking-widest text-eminence-600">
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
                className="border-2 focus:outline-none text-eminence-600 focus:border-eminence-800 focus:text-eminence-800 border-eminence-600 bg-eminence-50 p-2 rounded-md w-full"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-lg text-start leading-6 font-bold tracking-widest text-eminence-600">
              Description
            </label>
            <div className="mt-2">
              <textarea
                {...register("description", { required: "Please enter a description." })}
                id="description"
                name="description"
                rows={5}
                required
                autoComplete="current-password"
                className="border-2 focus:outline-none text-eminence-600 focus:border-eminence-800 focus:text-eminence-800 border-eminence-600 bg-eminence-50 p-2 rounded-md w-full"
              />
            </div>
          </div>

          <div>
            <button className="w-full tracking-widest uppercase hover:bg-eminence-800 ease-in-out duration-500 bg-eminence-600 p-2 rounded-md font-bold text-eminence-50" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
