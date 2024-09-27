import { createContext, useContext } from "react";
import { Task } from "../types";

export const TaskContext = createContext<{
  tasks: Task[];
  getTasks: () => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  createTask: (task: Task) => Promise<void>;
  getTask: (id: string) => Promise<Task | undefined>;
  updateTask: (id: string, task: Task) => Promise<void>;
} | null>(null);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};
