import axios from './axios';

export const registerUser = user => axios.post(`/register`, user);
export const loginUser = user => axios.post(`/login`, user);

export const verifyToken = () => axios.get(`/verify`);
