// Modal.js
import React from "react";
import { motion } from "framer-motion";

const Modal = ({ onClose, onSubscribe }) => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-white p-8 rounded shadow-md w-96">
        <button
          className="absolute top-2 right-2 p-4 text-gray-500 hover:text-gray-700 bg-black"
          onClick={onClose}
        >
          X
        </button>
        <h2 className="text-2xl font-semibold mb-4">
          Subscribe to Get Premium Features!
        </h2>
        <p className="text-gray-700 mb-4">
          Unlock exclusive features by subscribing to our premium plan.
        </p>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
          onClick={onSubscribe}
        >
          Buy Premium
        </button>
      </div>
    </motion.div>
  );
};

export default Modal;
