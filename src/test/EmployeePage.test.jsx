import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { describe, expect, it, vi } from "vitest";

import EmployeePage from "../pages/EmployeePage";
import employeeReducer, {
  removeEmployee,
} from "../store/employeeSlice";

vi.mock("../store/employeeSlice", async () => {
  const actual = await vi.importActual("../store/employeeSlice");

  return {
    ...actual,
    fetchEmployees: vi.fn(() => ({
      type: "employees/fetchEmployees",
    })),


    removeEmployee: vi.fn((id) => ({
  type: "employees/removeEmployee",
  payload: id,
})),
  };
});

vi.mock("../components/SearchEmployee", () => ({
  default: () => <div>Search Employee Component</div>,
}));

vi.mock("../components/EmployeeTable", () => ({
  default: ({ onEdit, onDelete }) => (
    <div>
      <button onClick={() => onEdit({ id: "1", name: "Amar Bhise" })}>
        Edit
      </button>

      <button onClick={() => onDelete("1")}>
        Delete
      </button>
    </div>
  ),
}));

vi.mock("../components/EmployeeForm", () => ({
  default: ({ employee, onClose }) => (
    <div>
      <p>{employee ? "Edit Employee" : "Add Employee"}</p>

      <button onClick={onClose}>Close Form</button>
    </div>
  ),
}));

const createTestStore = () => {
  return configureStore({
    reducer: {
      employees: employeeReducer,
    },
    preloadedState: {
      employees: {
        employees: [
          {
            id: "1",
            name: "Amar Bhise",
            email: "amar@gmail.com",
            mobile: "9730695484",
            country: "India",
          },
        ],
        selectedEmployee: null,
        loading: false,
        error: null,
      },
    },
  });
};

describe("EmployeePage", () => {
  it("displays employee management page", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <EmployeePage />
      </Provider>
    );

    expect(
      screen.getByText("Employee Management")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Search Employee Component")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Add Employee" })
    ).toBeInTheDocument();
  });

  it("opens add employee form", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <EmployeePage />
      </Provider>
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Add Employee" })
    );

    expect(
      screen.getByText("Add Employee", { selector: "p" })
    ).toBeInTheDocument();
  });

  it("opens edit employee form", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <EmployeePage />
      </Provider>
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Edit" })
    );

    expect(
      screen.getByText("Edit Employee", { selector: "p" })
    ).toBeInTheDocument();
  });

  it("deletes employee after confirmation", () => {
  const store = createTestStore();

  vi.spyOn(window, "confirm").mockReturnValue(true);

  render(
    <Provider store={store}>
      <EmployeePage />
    </Provider>
  );

  fireEvent.click(
    screen.getByRole("button", { name: "Delete" })
  );

  expect(window.confirm).toHaveBeenCalledWith(
    "Are you sure you want to delete this employee?"
  );

  expect(removeEmployee).toHaveBeenCalledWith("1");

  window.confirm.mockRestore();
});
});