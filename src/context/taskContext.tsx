import { useState, ReactNode } from "react";

import { TaskContext } from "../hooks/useTask";
import { Task } from "../types";

import { createTaskRequest, deleteTaskRequest, getTasksRequest, getTaskRequest, updateTaskRequest, } from "../hooks/taskHooks";

export default function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = async () => {
    const res = await getTasksRequest();
    setTasks(res.data);
  };

  const deleteTask = async (id: string) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (task: Task) => {
    try {
      await createTaskRequest(task);
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async (id: string) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id: string, task: Task) => {
    try {
      await updateTaskRequest(id, task);
      getTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, getTasks, deleteTask, createTask, getTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
}
