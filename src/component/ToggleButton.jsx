import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { themeAction } from "../store/Index";

const Switcher1 = () => {
  const dispatch = useDispatch();
  const themeDark = useSelector((state) => state.theme.themeDark);

  const handleCheckboxChange = () => {
    dispatch(themeAction.setThemeMode());
  };

  return (
    <div className="absolute ml-[90vw] mt-[-3vw]">
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            checked={themeDark}
            onChange={handleCheckboxChange}
            className="sr-only"
          />
          <div className="block h-8 w-14 rounded-full bg-[#000000] dark:bg-white"></div>
          <div
            className={`dot absolute top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white dark:bg-gray-700 transition
          ${themeDark ? "ml-7 bg-slate-500" : "ml-1"}`}
          >
            <span
              className={`h-3 w-3 rounded-full ${
                themeDark ? "bg-white" : "bg-slate-800"
              }`}
            ></span>
          </div>
        </div>
      </label>
    </div>
  );
};

export default Switcher1;
