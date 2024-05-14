import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Form from "./components/Form";

//clears tokens on logout
function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}
//clears tokens on register
function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  //set routes
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login/" element={<Login />} />
        <Route path="/logout/" element={<Logout />} />
        <Route path="/register/" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
