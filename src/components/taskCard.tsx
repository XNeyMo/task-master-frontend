import { useTasks } from "../context/task";

export function TaskCard({ task }) {
  const { deleteTask } = useTasks();

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <button className="bg-indigo-500 px-4 py-1 rounded-md my-2 disabled:bg-indigo-300" onClick={() => deleteTask(task._id)}>Delete</button>
          <button className="bg-indigo-500 px-4 py-1 rounded-md my-2 disabled:bg-indigo-300">Edit</button>
        </div>
      </header>
      <p className="text-slate-300">{task.description}</p>
    </div>
  );
}
