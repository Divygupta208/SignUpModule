import React, { useState } from "react";
import { motion } from "framer-motion";

const ExpenseList = ({ expenses }) => {
  const handleRemove = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };

  const handleEdit = (index) => {
    // Add your edit logic here
    console.log(`Edit expense at index ${index}`);
  };

  return (
    <motion.div className="max-w-xl mx-auto mt-8">
      {expenses.map((expense, index) => (
        <motion.div
          key={index}
          drag
          whileDrag={{ scale: 1.2 }}
          dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-4 rounded mb-4 shadow-md flex items-center justify-between"
        >
          <div>
            <p className="text-gray-700 font-bold">{expense.Amount}</p>
            <p className="text-gray-500">{expense.Description}</p>
            <p className="text-teal-500">{expense.Category}</p>
          </div>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleEdit(index)}
              className="bg-yellow-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            >
              Edit
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleRemove(index)}
              className="bg-red-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            >
              Remove
            </motion.button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ExpenseList;
