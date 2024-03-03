import React from "react";
import Navbar from "../component/Navbar";
import { Outlet } from "react-router-dom";
import Switcher1 from "../component/ToggleButton";
import { useSelector } from "react-redux";

const HomeRoot = () => {
  const isSubscribed = useSelector((state) => state.expense.isSubscribed);

  return (
    <>
      <div className="w-[100vw] h-[100vh] dark:bg-black overflow-hidden p-2">
        <Navbar />
        {isSubscribed && <Switcher1 />}
        <Outlet />
      </div>
    </>
  );
};

export default HomeRoot;
