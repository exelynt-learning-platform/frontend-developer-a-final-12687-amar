import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  clearError,
  clearSelectedEmployee,
  fetchEmployeeById,
} from "../store/employeeSlice";

function SearchEmployee() {
  const [employeeId, setEmployeeId] = useState("");

  const dispatch = useDispatch();

  const { selectedEmployee, loading, error } = useSelector(
    (state) => state.employees
  );

  const handleSearch = (event) => {
    event.preventDefault();

    if (!employeeId.trim()) {
      return;
    }

    dispatch(clearError());
    dispatch(fetchEmployeeById(employeeId.trim()));
  };

 const handleClear = () => {
  setEmployeeId("");
  dispatch(clearError());
  dispatch(clearSelectedEmployee());
};

  return (
    <div className="search-section">
      <h2>Search Employee</h2>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={employeeId}
          onChange={(event) => setEmployeeId(event.target.value)}
          placeholder="Enter employee ID"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>

        <button
          type="button"
          className="clear-button"
          onClick={handleClear}
        >
          Clear
        </button>
      </form>

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      {selectedEmployee && !error && (
        <div className="employee-result">
          <h3>Employee Details</h3>

          <div className="employee-details">
            <p>
              <strong>ID:</strong> {selectedEmployee.id}
            </p>

            <p>
              <strong>Name:</strong> {selectedEmployee.name}
            </p>

            <p>
              <strong>Email:</strong> {selectedEmployee.email}
            </p>

            <p>
              <strong>Mobile:</strong> {selectedEmployee.mobile}
            </p>

            <p>
              <strong>Country:</strong> {selectedEmployee.country}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchEmployee;
