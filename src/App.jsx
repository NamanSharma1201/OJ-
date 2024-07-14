import React from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import LoginReg from "./pages/auth/LoginReg";
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail";
import ResetPassword from "./pages/auth/ResetPassword";
import Blogs from "./pages/Blogs";
import Dashboard from "./pages/Dashboard";
import Problems from "./pages/Problems";
import './styles.css';
import SolveProblem from "./pages/SolveProblem";
import CreateProblem from "./pages/CreateProblem";
import ReadBlog from "./pages/ReadBlog";
import CreateBlog from "./pages/CreateBlog";
const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<LoginReg />} />
            <Route path="sendpasswordresetemail" element={<SendPasswordResetEmail />} />
            <Route path="reset/:id/:token" element={<ResetPassword />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="create-problem" element={<CreateProblem />} />

            <Route path="problem-set" element={<Problems />} />
            <Route path="create-blog" element={<CreateBlog />} />

            <Route path="blogs" element={<Blogs />} />
            <Route path="blog/:id" element={<ReadBlog />} />

            <Route path="problem/:id" element={<SolveProblem />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
