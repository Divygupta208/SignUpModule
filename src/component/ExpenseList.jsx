import React, { useState } from "react";
import { motion } from "framer-motion";
import ExpenseListItem from "./ExpenseListItem";

const ExpenseList = ({ expenses, removeHandler }) => {
  return (
    <motion.div className="max-w-xl mx-auto mt-8">
      {expenses.map((expense, index) => (
        <ExpenseListItem
          key={expense.id}
          expense={expense}
          index={index}
          removeHandler={removeHandler}
        />
      ))}
    </motion.div>
  );
};

export default ExpenseList;
