import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
const ExpenseListItem = ({ expense, index, removeHandler }) => {
  const isPremium = useSelector((state) => state.expense.isPremiumActivated);
  const isSubscribed = useSelector((state) => state.expense.isSubscribed);
  const handleRemove = () => {
    removeHandler(expense.id, expense._id);
  };
  return (
    <motion.div
      key={index}
      drag
      whileDrag={{ scale: 1.2 }}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="bg-white p-4 rounded mb-4 shadow-md flex items-center justify-between"
    >
      {isPremium ? (
        <div>
          <p className="text-black font-bold">{expense.Amount}</p>
          <p className="text-gray-500">{expense.Description}</p>
          <p className="text-teal-500">{expense.Category}</p>
        </div>
      ) : (
        <div>
          <p className="text-gray-700 font-bold">{expense.Amount}</p>
          <p className="text-gray-500">{expense.Description}</p>
          <p className="text-teal-500">{expense.Category}</p>
        </div>
      )}

      <div className="flex space-x-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={
            isPremium
              ? "bg-gray-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
              : "bg-yellow-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
          }
        >
          Edit
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleRemove}
          className={
            isPremium
              ? "bg-gray-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
              : "bg-red-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
          }
        >
          Remove
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ExpenseListItem;
