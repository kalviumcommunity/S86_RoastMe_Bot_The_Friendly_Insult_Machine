// src/api.js
import axios from 'axios';

// Set the base URL to your backend server
const BASE_URL = 'http://localhost:3000/api'; // Update this to your actual backend URL if needed

// Function to fetch all users
export const getUsers = () => axios.get(`${BASE_URL}/users`);

// Function to update a user
export const updateUser = (id, data) => axios.put(`${BASE_URL}/users/${id}`, data);

// Function to delete a user
export const deleteUser = (id) => axios.delete(`${BASE_URL}/users/${id}`);
