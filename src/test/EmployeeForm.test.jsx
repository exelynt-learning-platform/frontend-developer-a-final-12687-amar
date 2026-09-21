import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import EmployeeForm from "../components/EmployeeForm";

const defaultProps = {
  employee: null,
  countries: [
    {
      id: "1",
      country: "India",
    },
  ],
  countryLoading: false,
  countryError: null,
  employeeLoading: false,
  onSubmit: vi.fn(),
  onClose: vi.fn(),
};

const renderForm = (props = {}) => {
  return render(
    <EmployeeForm
      {...defaultProps}
      {...props}
    />
  );
};

describe("EmployeeForm", () => {
  it("shows validation error when name is empty", async () => {
    const user = userEvent.setup();

    renderForm();

    await user.click(
      screen.getByRole("button", {
        name: "Add Employee",
      })
    );

    expect(
      screen.getByText("Name is required")
    ).toBeInTheDocument();
  });

  it("shows validation error for invalid email", async () => {
    const user = userEvent.setup();

    renderForm();

    await user.type(
      screen.getByLabelText("Email"),
      "invalid-email"
    );

    await user.click(
      screen.getByRole("button", {
        name: "Add Employee",
      })
    );

    expect(
      screen.getByText("Enter a valid email address")
    ).toBeInTheDocument();
  });

  it("shows validation error for invalid mobile number", async () => {
    const user = userEvent.setup();

    renderForm();

    await user.type(
      screen.getByLabelText("Mobile"),
      "12345"
    );

    await user.click(
      screen.getByRole("button", {
        name: "Add Employee",
      })
    );

    expect(
      screen.getByText(
        "Mobile number must contain 10 digits"
      )
    ).toBeInTheDocument();
  });

  it("shows validation error when country is not selected", async () => {
    const user = userEvent.setup();

    renderForm();

    await user.type(
      screen.getByLabelText("Name"),
      "Amar Bhise"
    );

    await user.type(
      screen.getByLabelText("Email"),
      "amar@gmail.com"
    );

    await user.type(
      screen.getByLabelText("Mobile"),
      "9730695484"
    );

    await user.type(
      screen.getByLabelText("State"),
      "Maharashtra"
    );

    await user.type(
      screen.getByLabelText("District"),
      "Latur"
    );

    await user.click(
      screen.getByRole("button", {
        name: "Add Employee",
      })
    );

    expect(
      screen.getByText("Country is required")
    ).toBeInTheDocument();
  });

  it("renders country options from props", () => {
    renderForm();

    expect(
      screen.getByRole("option", {
        name: "India",
      })
    ).toBeInTheDocument();
  });

  it("shows API error when submit fails", async () => {
    const user = userEvent.setup();

    const onSubmit = vi
      .fn()
      .mockRejectedValue("Failed to save employee");

    renderForm({ onSubmit });

    await user.type(
      screen.getByLabelText("Name"),
      "Amar Bhise"
    );

    await user.type(
      screen.getByLabelText("Email"),
      "amar@gmail.com"
    );

    await user.type(
      screen.getByLabelText("Mobile"),
      "9730695484"
    );

    await user.selectOptions(
      screen.getByLabelText("Country"),
      "India"
    );

    await user.type(
      screen.getByLabelText("State"),
      "Maharashtra"
    );

    await user.type(
      screen.getByLabelText("District"),
      "Latur"
    );

    await user.click(
      screen.getByRole("button", {
        name: "Add Employee",
      })
    );

    expect(
      await screen.findByText("Failed to save employee")
    ).toBeInTheDocument();
  });
});