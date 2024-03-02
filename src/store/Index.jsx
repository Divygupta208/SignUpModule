import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: localStorage.getItem("token") || null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },

    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
    isPremiumActivated: false,
  },
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);

      state.isPremiumActivated =
        state.expenses.reduce((total, expense) => total + expense.Amount, 0) >
        10000;
    },
    setExpenses: (state, action) => {
      state.expenses = action.payload;
      state.isPremiumActivated =
        state.expenses.reduce((total, expense) => total + expense.Amount, 0) >
        10000;
    },
  },
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    expense: expensesSlice.reducer,
  },
});

export const authAction = authSlice.actions;
export const expenseAction = expensesSlice.actions;
export default store;
