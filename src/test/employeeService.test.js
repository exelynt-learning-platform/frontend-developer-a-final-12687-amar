import { describe, expect, it, vi } from "vitest";

import api from "../services/api";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";


vi.mock("../services/api", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("employeeService", () => {
  it("gets employees successfully", async () => {
    const employees = [
      {
        id: "1",
        name: "Amar Bhise",
        email: "amar@gmail.com",
        mobile: "9730695484",
        country: "India",
      },
    ];

    api.get.mockResolvedValue({
      data: employees,
    });

    const result = await getEmployees();

    expect(api.get).toHaveBeenCalledWith("/employee");
    expect(result).toEqual(employees);
  });

  it("creates an employee successfully", async () => {
  const employee = {
    name: "Amar Bhise",
    email: "amar@gmail.com",
    mobile: "9730695484",
    country: "India",
    state: "Maharashtra",
    district: "Pune",
  };

  const createdEmployee = {
    id: "21",
    ...employee,
  };

  api.post.mockResolvedValue({
    data: createdEmployee,
  });

  const result = await createEmployee(employee);

  expect(api.post).toHaveBeenCalledWith("/employee", employee);
  expect(result).toEqual(createdEmployee);
});

it("updates an employee successfully", async () => {
  const employeeId = "20";

  const employee = {
    name: "Amar Bhise Updated",
    email: "amar.updated@gmail.com",
    mobile: "9730695484",
    country: "India",
    state: "Maharashtra",
    district: "Pune",
  };

  const updatedEmployee = {
    id: employeeId,
    ...employee,
  };

  api.put.mockResolvedValue({
    data: updatedEmployee,
  });

  const result = await updateEmployee(employeeId, employee);

  expect(api.put).toHaveBeenCalledWith(
    `/employee/${employeeId}`,
    employee
  );

  expect(result).toEqual(updatedEmployee);
});

it("deletes an employee successfully", async () => {
  const employeeId = "20";

  api.delete.mockResolvedValue({
    data: {},
  });

  const result = await deleteEmployee(employeeId);

  expect(api.delete).toHaveBeenCalledWith(
    `/employee/${employeeId}`
  );

  expect(result).toEqual({});
});

  it("throws error when getting employees fails", async () => {
    const error = new Error("Network Error");

    api.get.mockRejectedValue(error);

    await expect(getEmployees()).rejects.toThrow(
      "Network Error"
    );

    expect(api.get).toHaveBeenCalledWith("/employee");
  });

  it("throws error when creating employee fails", async () => {
    const employee = {
      name: "Amar Bhise",
      email: "amar@gmail.com",
      mobile: "9730695484",
      country: "India",
      state: "Maharashtra",
      district: "Latur",
    };

    const error = new Error("Create failed");

    api.post.mockRejectedValue(error);

    await expect(createEmployee(employee)).rejects.toThrow(
      "Create failed"
    );

    expect(api.post).toHaveBeenCalledWith(
      "/employee",
      employee
    );
  });

  it("throws error when updating employee fails", async () => {
    const employeeId = "20";

    const employee = {
      name: "Amar Bhise Updated",
      email: "amar.updated@gmail.com",
      mobile: "9730695484",
      country: "India",
      state: "Maharashtra",
      district: "Latur",
    };

    const error = new Error("Update failed");

    api.put.mockRejectedValue(error);

    await expect(
      updateEmployee(employeeId, employee)
    ).rejects.toThrow("Update failed");

    expect(api.put).toHaveBeenCalledWith(
      `/employee/${employeeId}`,
      employee
    );
  });

  it("throws error when deleting employee fails", async () => {
    const employeeId = "20";

    const error = new Error("Delete failed");

    api.delete.mockRejectedValue(error);

    await expect(
      deleteEmployee(employeeId)
    ).rejects.toThrow("Delete failed");

    expect(api.delete).toHaveBeenCalledWith(
      `/employee/${employeeId}`
    );
  });
});