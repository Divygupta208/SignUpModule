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

// const expensesSlice = createSlice({
//   name: "expenses",
//   initialState: {
//     expenses: [],
//     isPremiumActivated: false,
//     isSubscribed: false,
//   },
//   reducers: {
//     addExpense: (state, action) => {
//       state.expenses.push(action.payload);

//       state.isPremiumActivated =
//         state.expenses.reduce((total, expense) => total + expense.Amount, 0) >
//         10000;
//     },
//     setExpenses: (state, action) => {
//       state.expenses = action.payload;

//       state.isPremiumActivated =
//         state.expenses.reduce((total, expense) => total + expense.Amount, 0) >
//         10000;
//     },

//     setIsSubscribed: (state, action) => {
//       state.isSubscribed = action.payload;
//     },
//     setIsPremium: (state, action) => {
//       state.isPremiumActivated = action.payload;
//     },
//   },
// });

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
    isPremiumActivated:
      localStorage.getItem("isPremiumActivated") === "true" ? true : false,
    isSubscribed: false,
  },
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);

      const totalAmount = state.expenses.reduce(
        (total, expense) => total + expense.Amount,
        0
      );
      state.isPremiumActivated = totalAmount > 10000;
      localStorage.setItem(
        "isPremiumActivated",
        state.isPremiumActivated.toString()
      );
    },
    setExpenses: (state, action) => {
      state.expenses = action.payload;

      const totalAmount = state.expenses.reduce(
        (total, expense) => total + expense.Amount,
        0
      );
      state.isPremiumActivated = totalAmount > 10000;
      localStorage.setItem(
        "isPremiumActivated",
        state.isPremiumActivated.toString()
      );
    },

    setIsSubscribed: (state, action) => {
      state.isSubscribed = action.payload;
    },
    setIsPremium: (state, action) => {
      state.isPremiumActivated = action.payload;
      localStorage.setItem("isPremiumActivated", action.payload.toString());
    },
  },
});

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    themeDark: false,
  },
  reducers: {
    setThemeMode: (state) => {
      state.themeDark = !state.themeDark;
    },
  },
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    expense: expensesSlice.reducer,
    theme: themeSlice.reducer,
  },
});

export const authAction = authSlice.actions;
export const themeAction = themeSlice.actions;
export const expenseAction = expensesSlice.actions;
export default store;
