import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./pages/UserList";
import AddEntity from "./pages/AddEntity";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<AddEntity />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
