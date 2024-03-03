import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

const Navbar = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <>
      <div className="bg-slate-950 dark:bg-white h-[10vh] w-[60vw] mx-auto mt-1 rounded-full ">
        <ul className="flex justify-evenly p-6">
          <Link
            className="text-white dark:text-black dark:font-medium"
            to={`expenses`}
          >
            Expenses
          </Link>
          <Link className="text-white dark:text-black dark:font-medium">
            About
          </Link>
          <Link
            className="text-white dark:text-black dark:font-medium"
            to={`profile/${token}`}
          >
            Profile
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
