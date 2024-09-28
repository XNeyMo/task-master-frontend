import { notifications } from "@mantine/notifications";
import { useTasks } from "../hooks/useTask";
import { TaskCardProps } from "../types";

import { IconTrash } from "@tabler/icons-react";

export default function TaskCard({ task, openModal }: TaskCardProps) {
  const { deleteTask } = useTasks();

  return (
    <div className="p-5 rounded-md text-start h-[212px] border-2 border-eminence-600">
      <header className="flex justify-between items-center gap-5 mb-5">
        <h2 className="text-2xl text-eminence-600 font-bold truncate">{task.title}</h2>

        <div className="flex gap-5">
          <button
            className="text-[#A3E635] hover:text-[#65A30D] ease-in-out duration-500"
            onClick={() => openModal(task)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" /></svg>
          </button>

          <button
            className="text-[#F87171] hover:text-[#DC2626] ease-in-out duration-500"
            onClick={() => {
              deleteTask(task._id),
                notifications.show({
                  title: 'Task Deleted',
                  message: 'Task has been deleted successfully.',
                  color: 'red',
                  icon: <IconTrash />,
                })
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
          </button>
        </div>
      </header>

      <p className="line-clamp-5">{task.description}</p>
    </div>
  );
}
