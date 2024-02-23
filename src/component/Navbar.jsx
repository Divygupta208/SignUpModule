import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";

const Navbar = () => {
  const { token } = useContext(AuthContext);

  return (
    <div className="bg-slate-950 h-[10vh] w-[60vw] mx-auto mt-2 rounded-full ">
      <ul className="flex justify-evenly p-6">
        <Link className="text-white " to={`expenses`}>
          Expenses
        </Link>
        <Link className="text-white">About</Link>
        <Link className="text-white" to={`profile/${token}`}>
          Profile
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
