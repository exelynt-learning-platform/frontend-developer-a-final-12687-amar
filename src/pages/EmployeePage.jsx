import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";
import Loading from "../components/Loading";
import SearchEmployee from "../components/SearchEmployee";

import {
  fetchEmployees,
  removeEmployee,
} from "../store/employeeSlice";

function EmployeePage() {
  const dispatch = useDispatch();

 const { employees, loading } = useSelector(
  (state) => state.employees
);
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setShowForm(true);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedEmployee(null);
  };

const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this employee?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    await dispatch(removeEmployee(id)).unwrap();
    alert("Employee deleted successfully");
  } catch (error) {
    alert(error || "Failed to delete employee");
  }
};
  return (
    <div className="employee-page">
      <div className="page-header">
        <div>
          <h1>Employee Management</h1>
          <p>Manage your employees</p>
        </div>

        <button
          type="button"
          className="add-button"
          onClick={handleAddEmployee}
        >
          Add Employee
        </button>
      </div>

      <SearchEmployee />

      {loading && <Loading />}

      
      

     {!loading && (
  <EmployeeTable
    employees={employees}
    onEdit={handleEdit}
    onDelete={handleDelete}
  />
)}

      {showForm && (
        <EmployeeForm
          employee={selectedEmployee}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}

export default EmployeePage;