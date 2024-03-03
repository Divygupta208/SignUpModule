import React, { useState } from "react";
import { motion } from "framer-motion";
import ExpenseListItem from "./ExpenseListItem";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { expenseAction } from "../store/Index";

const ExpenseList = ({ removeHandler }) => {
  const expenses = useSelector((state) => state.expense.expenses);
  const isPremium = useSelector((state) => state.expense.isPremiumActivated);
  const isSubscribed = useSelector((state) => state.expense.isSubscribed);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(true);

  const handleSubscribe = () => {
    dispatch(expenseAction.setIsSubscribed(true));
    dispatch(expenseAction.setIsPremium(false));

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
            isSubscribed={isSubscribed}
          />
        ))}
      </motion.div>
    </>
  );
};

export default ExpenseList;
