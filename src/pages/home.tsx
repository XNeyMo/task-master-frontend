import { useEffect, useState } from "react";
import { useTasks } from "../context/task";
import { TaskCard } from "../components/taskCard";
import Header from "../components/header";
import TaskModal from "../components/modals/task";

export default function Home() {
  const { tasks, getTasks } = useTasks();

  const [isOpenTaskModal, setOpenTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

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

      {tasks.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <h1 className="font-bold text-xl">
            No tasks yet, please add a new task
          </h1>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {tasks.map((task: any) => (
          <TaskCard task={task} openModal={openTask} key={task._id} />
        ))}
      </div>
    </>
  );
}
