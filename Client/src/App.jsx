import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import LoginReg from "./pages/auth/LoginReg";
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/Dashboard"; // Assuming Dashboard is exported correctly

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<LoginReg />} />
          <Route path="sendpasswordresetemail" element={<SendPasswordResetEmail />} />
          <Route path="reset/:id/:token" element={<ResetPassword />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<h1>404 Not Found</h1>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
