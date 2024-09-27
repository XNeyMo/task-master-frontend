import { useEffect, useState } from "react";
import { useTasks } from "../hooks/useTask";

import TaskCard from "../components/taskCard";
import Header from "../components/header";
import TaskModal from "../components/modals/taskModal";

import { Task } from "../types";

export default function HomePage() {
  const { tasks, getTasks } = useTasks();

  const [isOpenTaskModal, setOpenTaskModal] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const openTask = (task) => {
    setSelectedTask(task);
    setOpenTaskModal(true);
  }

  const createTask = () => {
    setSelectedTask(null);
    setOpenTaskModal(true);
  }

  const closeTask = () => {
    setSelectedTask(null);
    setOpenTaskModal(false);
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <TaskModal
        isOpen={isOpenTaskModal}
        onClose={closeTask}
        task={selectedTask}
      />

      <Header createTask={createTask} />

      <div className="pt-[84px]">
        {tasks.length === 0 && (
          <div className="flex justify-center items-center p-10 h-[calc(100vh-84px)]">
            <h1 className="font-bold text-2xl text-eminence-600 uppercase">
              No tasks yet, please add a new task
            </h1>
          </div>
        )}

        {tasks.length > 0 && (
          <div className="p-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tasks.map((task) => (
              <TaskCard task={task} openModal={openTask} key={task._id} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
