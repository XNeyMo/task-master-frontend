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
