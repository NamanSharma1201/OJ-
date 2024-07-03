// src/components/pages/Layout.jsx
import React from "react";
import { CssBaseline } from '@mui/material';
import Navbar from "../components/Navbar.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
