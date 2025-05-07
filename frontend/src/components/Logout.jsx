import React from 'react';
import axios from 'axios';

const Logout = () => {
  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/logout');
      alert(response.data.message); // Show logout success message
      // Optionally redirect user to a different page after logout
    } catch (err) {
      alert('Logout failed. Try again.');
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
