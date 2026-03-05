import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import LoginPage from "./page";

const replaceMock = vi.fn();
const loginMock = vi.fn().mockResolvedValue(undefined);
const signupMock = vi.fn().mockResolvedValue(undefined);

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: replaceMock,
  }),
  useSearchParams: () => new URLSearchParams("redirect=/problems/f1-score-from-scratch"),
}));

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    login: loginMock,
    signup: signupMock,
    isLoading: false,
  }),
}));

describe("LoginPage", () => {
  beforeEach(() => {
    replaceMock.mockClear();
    loginMock.mockClear();
    signupMock.mockClear();
  });

  it("submits login and redirects to redirect param", async () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByTestId("auth-submit"));

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });

    expect(replaceMock).toHaveBeenCalledWith("/problems/f1-score-from-scratch");
  });

  it("submits signup payload", async () => {
    render(<LoginPage />);

    fireEvent.click(screen.getByTestId("auth-tab-signup"));

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Ada" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "ada@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByTestId("auth-submit"));

    await waitFor(() => {
      expect(signupMock).toHaveBeenCalledWith({
        name: "Ada",
        email: "ada@example.com",
        password: "password123",
      });
    });
  });
});
