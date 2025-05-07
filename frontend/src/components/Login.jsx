import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { username });
      alert(response.data.message); // Show login success message
      // Optionally redirect user to a different page after successful login
    } catch (err) {
      alert('Login failed. Try again.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter Username"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
