import React, { useState } from "react";
import { motion } from "framer-motion";
import ExpenseListItem from "./ExpenseListItem";
import Modal from "./Modal";
import { useSelector } from "react-redux";

const ExpenseList = ({ removeHandler }) => {
  const expenses = useSelector((state) => state.expense.expenses);
  const isPremium = useSelector((state) => state.expense.isPremiumActivated);

  const [showModal, setShowModal] = useState(true);
  const handleSubscribe = () => {
    // Add logic for handling subscription (e.g., redirect to payment page)
    // For now, you can just close the modal
    setShowModal(false);
  };

  return (
    <>
      {isPremium && showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onSubscribe={handleSubscribe}
        />
      )}
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
    </>
  );
};

export default ExpenseList;
