import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import UserProfilePage from "../component/UserProfilePage";

jest.mock("react-router-dom", () => ({
  useParams: jest.fn().mockReturnValue({ id: "mockedUserId" }),
}));

jest.mock("../component/TiltCard", () => ({ username, userImg }) => (
  <div>
    <span data-testid="mocked-username">{username}</span>
    <img data-testid="mocked-user-img" src={userImg} alt="User" />
  </div>
));

describe("UserProfilePage", () => {
  it("renders user profile information correctly", async () => {
    const mockApiResponse = {
      users: [
        {
          displayName: "John Doe",
          photoUrl: "https://example.com/johndoe.jpg",
        },
      ],
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockApiResponse),
    });

    render(<UserProfilePage />);

    const username = await screen.findByText("John Doe");

    expect(username).toBeInTheDocument();
    expect(screen.getByTestId("mocked-user-img")).toHaveAttribute(
      "src",
      "https://example.com/johndoe.jpg"
    );
  });
});
