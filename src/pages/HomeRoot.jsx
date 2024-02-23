import React from "react";
import Navbar from "../component/Navbar";
import { Outlet } from "react-router-dom";

const HomeRoot = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default HomeRoot;
