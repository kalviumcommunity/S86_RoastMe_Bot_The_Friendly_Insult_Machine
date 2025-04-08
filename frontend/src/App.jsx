import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./pages/UserList";
import AddEntity from "./pages/AddEntity";
import UpdateEntity from "./pages/UpdateEntity"; // ✅ New

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<AddEntity />} />
        <Route path="/update/:id" element={<UpdateEntity />} /> {/* ✅ New */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
