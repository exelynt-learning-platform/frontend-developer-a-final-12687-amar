import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { describe, expect, it, vi } from "vitest";

import SearchEmployee from "../components/SearchEmployee";
import employeeReducer, {
  fetchEmployeeById,
} from "../store/employeeSlice";

vi.mock("../store/employeeSlice", async () => {
  const actual = await vi.importActual("../store/employeeSlice");

  return {
    ...actual,
    fetchEmployeeById: vi.fn((id) => ({
      type: "employees/fetchEmployeeById",
      payload: id,
    })),
  };
});

const renderComponent = () => {
  const store = configureStore({
    reducer: {
      employees: employeeReducer,
    },
    preloadedState: {
      employees: {
        employees: [],
        selectedEmployee: {
          id: "10",
          name: "Amar Bhise",
          email: "amar@gmail.com",
          mobile: "9730695484",
          country: "India",
        },
        loading: false,
        error: null,
      },
    },
  });

  return render(
    <Provider store={store}>
      <SearchEmployee />
    </Provider>
  );
};

describe("SearchEmployee", () => {
  it("displays employee details", () => {
    renderComponent();

    expect(screen.getByText("Employee Details")).toBeInTheDocument();
    expect(screen.getByText("Amar Bhise")).toBeInTheDocument();
    expect(screen.getByText("amar@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("9730695484")).toBeInTheDocument();
    expect(screen.getByText("India")).toBeInTheDocument();
  });

  it("searches employee by id", () => {
    renderComponent();

    const input = screen.getByPlaceholderText("Enter employee ID");

    fireEvent.change(input, {
      target: { value: "10" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Search" }));

    expect(fetchEmployeeById).toHaveBeenCalledWith("10");
  });
});