import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import EmployeeTable from "../components/EmployeeTable";

describe("EmployeeTable", () => {
  it("displays employee information", () => {
    const employees = [
      {
        id: "1",
        name: "Amar Bhise",
        email: "amar@gmail.com",
        mobile: "9730695484",
        country: "India",
      },
    ];

    render(
      <EmployeeTable
        employees={employees}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText("Amar Bhise")).toBeInTheDocument();
    expect(screen.getByText("amar@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("9730695484")).toBeInTheDocument();
    expect(screen.getByText("India")).toBeInTheDocument();
  });
});