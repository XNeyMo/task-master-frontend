import axios from "./axiosConfig";
import { Task } from "../types";

export const getTasksRequest = async () => axios.get("/tasks");
export const createTaskRequest = async (task: Task) => axios.post("/tasks", task);
export const updateTaskRequest = async (id: string, task: Task) => axios.put(`/tasks/${id}`, task);
export const deleteTaskRequest = async (id: string) => axios.delete(`/tasks/${id}`);
export const getTaskRequest = async (id: string) => axios.get(`/tasks/${id}`);
