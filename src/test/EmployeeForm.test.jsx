import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { describe, expect, it, vi } from "vitest";

import EmployeeForm from "../components/EmployeeForm";
import employeeReducer from "../store/employeeSlice";
import countryReducer from "../store/countrySlice";

const createTestStore = () => {
  return configureStore({
    reducer: {
      employees: employeeReducer,
      countries: countryReducer,
    },
    preloadedState: {
      employees: {
        employees: [],
        selectedEmployee: null,
        loading: false,
        error: null,
      },
      countries: {
        countries: [
          {
            id: "1",
            country: "India",
          },
        ],
        loading: false,
        error: null,
      },
    },
  });
};

const renderForm = () => {
  const store = createTestStore();

  return render(
    <Provider store={store}>
      <EmployeeForm onClose={vi.fn()} />
    </Provider>
  );
};

describe("EmployeeForm", () => {
  it("shows validation error when name is empty", async () => {
    const user = userEvent.setup();

    renderForm();

    const addButton = screen.getByRole("button", {
      name: "Add Employee",
    });

    await user.click(addButton);

    expect(screen.getByText("Name is required")).toBeInTheDocument();
  });

  it("shows validation error for invalid email", async () => {
    const user = userEvent.setup();

    renderForm();

    const emailInput = screen.getByLabelText("Email");

    await user.type(emailInput, "invalid-email");

    const addButton = screen.getByRole("button", {
      name: "Add Employee",
    });

    await user.click(addButton);

    expect(
      screen.getByText("Enter a valid email address")
    ).toBeInTheDocument();
  });

  it("shows validation error for invalid mobile number", async () => {
    const user = userEvent.setup();

    renderForm();

    const mobileInput = screen.getByLabelText("Mobile");

    await user.type(mobileInput, "12345");

    const addButton = screen.getByRole("button", {
      name: "Add Employee",
    });

    await user.click(addButton);

    expect(
      screen.getByText("Mobile number must contain 10 digits")
    ).toBeInTheDocument();
  });

  it("shows validation error when country is not selected", async () => {
    const user = userEvent.setup();

    renderForm();

    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const mobileInput = screen.getByLabelText("Mobile");
    const stateInput = screen.getByLabelText("State");
    const districtInput = screen.getByLabelText("District");

    await user.type(nameInput, "Amar Bhise");
    await user.type(emailInput, "amar@gmail.com");
    await user.type(mobileInput, "9730695484");
    await user.type(stateInput, "Maharashtra");
    await user.type(districtInput, "Latur");

    const addButton = screen.getByRole("button", {
      name: "Add Employee",
    });

    await user.click(addButton);

    expect(screen.getByText("Country is required")).toBeInTheDocument();
  });
});