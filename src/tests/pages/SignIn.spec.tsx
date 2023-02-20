/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignIn from "../../pages/index";

jest.mock("next/router", () => require("next-router-mock"));

describe("SignIn page", () => {
  it("renders correctly", () => {
    render(<SignIn />);

    expect(screen.getByText("E-mail")).toBeInTheDocument();
    expect(screen.getByText("Senha")).toBeInTheDocument();
    expect(screen.getByText("Entrar")).toBeInTheDocument();
  });

  it("redirect user to dashboard if email and password is correctly", async () => {
    const handleSignIn = jest.fn();

    render(<SignIn />);

    const form = screen.getByRole("form");

    form.onsubmit = (handleSignIn);

    const input_email = screen.getByLabelText("E-mail", {
      selector: "input",
    });

    const input_password = screen.getByLabelText("Senha", {
      selector: "input",
    });

    fireEvent.change(input_email, { target: { value: "admin@email.com" } });

    fireEvent.change(input_password, { target: { value: "123456" } });

    const button = screen.getByRole("button");

    fireEvent.click(button);

    await waitFor(() => expect(handleSignIn).toHaveBeenCalled());
  });
});
