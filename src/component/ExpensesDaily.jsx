import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ExpenseList from "./ExpenseList";
const ExpensesDaily = () => {
  const [expenses, setExpenses] = useState([]);

  const amountRef = useRef();
  const descRef = useRef();
  const categoryRef = useRef();

  const fetchExpensesHandler = async () => {
    const response = await fetch(
      "https://react-http-7951f-default-rtdb.firebaseio.com/expenses.json"
    );

    if (response.ok) {
      const data = await response.json();
      const dataArray = Object.entries(data).map(([id, item]) => ({
        _id: id,
        id: item.Id,
        Amount: item.Amount,
        Category: item.Category,
        Description: item.Description,
      }));

      setExpenses(dataArray);
    }
  };

  useEffect(() => {
    fetchExpensesHandler();
  }, []);

  const addExpensesHandler = async () => {
    const newExpense = {
      id: Math.floor(Math.random() * 1000),
      Amount: amountRef.current.value,
      Description: descRef.current.value,
      Category: categoryRef.current.value,
    };

    const response = fetch(
      `https://react-http-7951f-default-rtdb.firebaseio.com/expenses.json`,
      {
        method: "POST",
        body: JSON.stringify(newExpense),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setExpenses((prev) => {
        return [...prev, { ...newExpense, _id: data.name }];
      });
    }
  };

  const removeHandler = async (id, _id) => {
    console.log(_id);
    const response = await fetch(
      `https://react-http-7951f-default-rtdb.firebaseio.com/expenses/${_id}.json/`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      const data = await response.json();
    }

    const filter = expenses.filter((expense) => {
      return expense.id !== id;
    });

    const updatedExpense = [...filter];

    setExpenses(updatedExpense);
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-gradient-to-r from-teal-400 to-blue-500 rounded shadow-2xl">
      <motion.form
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-4 max-w-sm mx-auto">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="amount"
          >
            Amount
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="amount"
            type="number"
            placeholder="Enter amount"
            ref={amountRef}
          />
        </div>
        <div className="mb-4 max-w-sm mx-auto">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
            ref={descRef}
            placeholder="Enter description"
          />
        </div>
        <div className="mb-6 max-w-sm mx-auto">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            className="block appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            ref={categoryRef}
          >
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="fun">Fun</option>
          </select>
        </div>
        <div className="flex items-center justify-between ">
          <button
            onClick={addExpensesHandler}
            className="bg-white hover:bg-teal-900 mx-auto text-teal-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            type="button"
          >
            Submit
          </button>
        </div>
      </motion.form>

      <ExpenseList expenses={expenses} removeHandler={removeHandler} />
    </div>
  );
};

export default ExpensesDaily;
