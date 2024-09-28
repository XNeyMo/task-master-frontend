export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
}

export interface Task {
  _id: string;
  userId: string
  title: string;
  description: string;
  date?: Date;
}

export interface ErrorResponse {
  message: string;
}

export interface HeaderProps {
  createTask: () => void;
}

export interface TaskCardProps {
  task: Task;
  openModal: (task: Task) => void;
}

export interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task;
}
