import axios from './axiosConfig';
import { User } from '../types';

export const registerUser = (user: User) => axios.post(`/register`, user);
export const loginUser = (user: Omit<User, 'username'>) => axios.post(`/login`, user);

export const verifyToken = () => axios.get(`/verify`);
