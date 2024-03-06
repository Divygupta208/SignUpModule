// ExpenseList.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ExpenseList from "../component/ExpenseList";
import Modal from "../component/Modal";

jest.mock("../component/Modal", () => ({ onClose, onSubscribe }) => (
  <div data-testid="mock-modal">
    <button onClick={onClose} data-testid="mock-modal-close">
      Close
    </button>
    <button onClick={onSubscribe} data-testid="mock-modal-subscribe">
      Subscribe
    </button>
  </div>
));

describe("ExpenseList component", () => {
  const initialState = {
    expense: {
      expenses: [
        { id: 1, amount: 100, description: "Expense 1" },
        { id: 2, amount: 200, description: "Expense 2" },
      ],
      isPremiumActivated: true,
      isSubscribed: false,
    },
  };

  const mockStore = configureStore([]);

  test("renders ExpenseList component with expenses", async () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ExpenseList />
      </Provider>
    );

    // Assuming your ExpenseListItem renders a div with a text containing "Expense 1"
  });
  // const expenseItem = await waitFor(() => screen.findByText(/Expense 1/i));
  // expect(expenseItem).toBeInTheDocument();
  test("renders Modal when isPremium is true and showModal is true", () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ExpenseList />
      </Provider>
    );

    const modalElement = screen.getByTestId("mock-modal");
    expect(modalElement).toBeInTheDocument();
  });

  test("closes Modal when Close button is clicked", () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ExpenseList />
      </Provider>
    );

    const closeButton = screen.getByTestId("mock-modal-close");
    fireEvent.click(closeButton);

    const modalElement = screen.queryByTestId("mock-modal");
    expect(modalElement).not.toBeInTheDocument();
  });

  test("calls handleSubscribe when Subscribe button in Modal is clicked", () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ExpenseList />
      </Provider>
    );

    const subscribeButton = screen.getByTestId("mock-modal-subscribe");
    fireEvent.click(subscribeButton);

    // Check if the dispatch actions were called as expected
    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toEqual("expenses/setIsSubscribed");
    expect(actions[1].type).toEqual("expenses/setIsPremium");
  });
});
