import { describe, expect, it } from "vitest";

import employeeReducer, {
  clearError,
  clearSelectedEmployee,
  fetchEmployees,
  fetchEmployeeById,
  addEmployee,
  editEmployee,
  removeEmployee,
} from "../store/employeeSlice";

const initialState = {
  employees: [],
  selectedEmployee: null,
  loading: false,
  error: null,
};

const employee = {
  id: "1",
  name: "Amar Bhise",
  email: "amar@gmail.com",
  mobile: "9730695484",
  country: "India",
  state: "Maharashtra",
  district: "Latur",
};

describe("employeeSlice", () => {
  it("handles clearSelectedEmployee", () => {
    const state = {
      ...initialState,
      selectedEmployee: employee,
    };

    const result = employeeReducer(
      state,
      clearSelectedEmployee()
    );

    expect(result.selectedEmployee).toBeNull();
  });

  it("handles clearError", () => {
    const state = {
      ...initialState,
      error: "Something went wrong",
    };

    const result = employeeReducer(
      state,
      clearError()
    );

    expect(result.error).toBeNull();
  });

  it("handles fetchEmployees.pending", () => {
    const result = employeeReducer(
      initialState,
      fetchEmployees.pending("request-1")
    );

    expect(result.loading).toBe(true);
    expect(result.error).toBeNull();
  });

  it("handles fetchEmployees.fulfilled", () => {
    const employees = [employee];

    const result = employeeReducer(
      initialState,
      fetchEmployees.fulfilled(
        employees,
        "request-1"
      )
    );

    expect(result.loading).toBe(false);
    expect(result.employees).toEqual(employees);
  });

  it("handles fetchEmployees.rejected", () => {
    const result = employeeReducer(
      initialState,
      fetchEmployees.rejected(
        new Error("API Error"),
        "request-1",
        undefined,
        "Failed to load employees"
      )
    );

    expect(result.loading).toBe(false);
    expect(result.error).toBe(
      "Failed to load employees"
    );
  });

  it("handles fetchEmployeeById.fulfilled", () => {
    const result = employeeReducer(
      initialState,
      fetchEmployeeById.fulfilled(
        employee,
        "request-1",
        "1"
      )
    );

    expect(result.loading).toBe(false);
    expect(result.selectedEmployee).toEqual(employee);
  });

  it("handles fetchEmployeeById.rejected", () => {
    const result = employeeReducer(
      initialState,
      fetchEmployeeById.rejected(
        new Error("Not found"),
        "request-1",
        "999",
        "Employee not found"
      )
    );

    expect(result.loading).toBe(false);
    expect(result.selectedEmployee).toBeNull();
    expect(result.error).toBe("Employee not found");
  });

  it("handles addEmployee.fulfilled", () => {
    const result = employeeReducer(
      initialState,
      addEmployee.fulfilled(
        employee,
        "request-1",
        employee
      )
    );

    expect(result.loading).toBe(false);
    expect(result.employees).toContainEqual(employee);
  });

  it("handles editEmployee.fulfilled with matching string/number ID", () => {
    const existingEmployee = {
      ...employee,
      id: 1,
      name: "Old Name",
    };

    const updatedEmployee = {
      ...employee,
      id: "1",
      name: "Updated Name",
    };

    const state = {
      ...initialState,
      employees: [existingEmployee],
    };

    const result = employeeReducer(
      state,
      editEmployee.fulfilled(
        updatedEmployee,
        "request-1",
        {
          id: "1",
          employee: updatedEmployee,
        }
      )
    );

    expect(result.loading).toBe(false);
    expect(result.employees[0]).toEqual(
      updatedEmployee
    );
  });

  it("handles editEmployee.fulfilled when employee ID is not found", () => {
    const state = {
      ...initialState,
      employees: [employee],
    };

    const updatedEmployee = {
      ...employee,
      id: "999",
      name: "Updated Name",
    };

    const result = employeeReducer(
      state,
      editEmployee.fulfilled(
        updatedEmployee,
        "request-1",
        {
          id: "999",
          employee: updatedEmployee,
        }
      )
    );

    expect(result.loading).toBe(false);
    expect(result.employees).toEqual([employee]);
  });

  it("handles removeEmployee.fulfilled with matching string/number ID", () => {
    const state = {
      ...initialState,
      employees: [
        {
          ...employee,
          id: 1,
        },
        {
          ...employee,
          id: "2",
          name: "Another Employee",
        },
      ],
    };

    const result = employeeReducer(
      state,
      removeEmployee.fulfilled(
        "1",
        "request-1",
        "1"
      )
    );

    expect(result.loading).toBe(false);
    expect(result.employees).toHaveLength(1);
    expect(result.employees[0].id).toBe("2");
  });

  it("handles removeEmployee.rejected", () => {
    const result = employeeReducer(
      initialState,
      removeEmployee.rejected(
        new Error("Delete failed"),
        "request-1",
        "1",
        "Failed to delete employee"
      )
    );

    expect(result.loading).toBe(false);
    expect(result.error).toBe(
      "Failed to delete employee"
    );
  });
});