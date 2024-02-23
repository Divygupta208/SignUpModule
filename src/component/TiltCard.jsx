import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiMousePointer } from "react-icons/fi";

const Example = ({ username, userImg }) => {
  return (
    <div className="grid w-full  place-content-center  px-4 py-12 text-white">
      Welcome To Your Profile
      <TiltCard username={username} userImg={userImg} />
    </div>
  );
};

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const TiltCard = ({ username, userImg }) => {
  const ref = useRef(null);

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rY = mouseX / width - HALF_ROTATION_RANGE;
    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      className="relative h-96 w-72 rounded-xl bg-gradient-to-br from-red-300 to-violet-900"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 grid place-content-center rounded-xl bg-white shadow-lg"
      >
        <p
          style={{
            transform: "translateZ(50px)",
          }}
          className="text-center text-2xl w-60 font-bold mt-[-10rem] rounded-lg"
        >
          <img className="rounded-lg" src={userImg} />
        </p>
        <p className="absolute mt-56 ml-16 font-bold text-2xl text-slate-950">
          {username}
        </p>
      </div>
    </motion.div>
  );
};

export default Example;
