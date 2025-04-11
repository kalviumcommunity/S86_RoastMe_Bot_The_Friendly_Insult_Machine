// src/api.js
import axios from 'axios';

const BASE_URL = 'https://your-backend-url.com'; // replace with your backend URL

export const getUsers = () => axios.get(`${BASE_URL}/users`);
export const updateUser = (id, data) => axios.put(`${BASE_URL}/users/${id}`, data);
export const deleteUser = (id) => axios.delete(`${BASE_URL}/users/${id}`);
