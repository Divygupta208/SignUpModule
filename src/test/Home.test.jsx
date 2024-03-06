import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../component/Home";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

test("renders welcome message", () => {
  render(<Home />, { wrapper: MemoryRouter });
  const welcomeMessage = screen.getByText(/Welcome To Expense Tracker/i);
  expect(welcomeMessage).toBeInTheDocument();
});

test("renders incomplete profile message", () => {
  render(<Home />, { wrapper: MemoryRouter });
  const incompleteProfileMessage = screen.getByText(
    /your profile is incomplete/i
  );
  expect(incompleteProfileMessage).toBeInTheDocument();
});

test("calls navigate on button click", () => {
  const { useNavigate } = require("react-router-dom");

  const mockNavigate = jest.fn();
  useNavigate.mockReturnValue(mockNavigate);

  render(<Home />);
  const completeProfileButton = screen.getByText(/Complete Profile/i);
  fireEvent.click(completeProfileButton);

  expect(mockNavigate).toHaveBeenCalledWith("/profile");
});
