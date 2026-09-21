import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";
import Loading from "../components/Loading";
import SearchEmployee from "../components/SearchEmployee";
import ConfirmModal from "../components/ConfirmModal";

import {
  addEmployee,
  editEmployee,
  fetchEmployees,
  removeEmployee,
} from "../store/employeeSlice";

import { fetchCountries } from "../store/countrySlice";

function EmployeePage() {
  const dispatch = useDispatch();

  const {
    employees,
    loading: employeeLoading,
    error: employeeError,
  } = useSelector((state) => state.employees);

  const {
    countries,
    loading: countryLoading,
    error: countryError,
  } = useSelector((state) => state.countries);

  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries());
    }
  }, [dispatch, countries.length]);

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

  const handleSaveEmployee = async (formData) => {
    if (selectedEmployee) {
      await dispatch(
        editEmployee({
          id: selectedEmployee.id,
          employee: formData,
        })
      ).unwrap();
    } else {
      await dispatch(addEmployee(formData)).unwrap();
    }

    handleCloseForm();
  };

  const handleDelete = (id) => {
    setDeleteEmployeeId(id);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(
        removeEmployee(deleteEmployeeId)
      ).unwrap();

      setMessage("Employee deleted successfully");
      setDeleteEmployeeId(null);
    } catch (error) {
      setMessage(error || "Failed to delete employee");
      setDeleteEmployeeId(null);
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

      {message && (
        <div className="success-message" role="alert">
          {message}
        </div>
      )}

      {employeeLoading && <Loading />}

      {employeeError && (
        <div className="error-message" role="alert">
          {employeeError}
        </div>
      )}

      {!employeeLoading && (
        <EmployeeTable
          employees={employees}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {showForm && (
        <EmployeeForm
          employee={selectedEmployee}
          countries={countries}
          countryLoading={countryLoading}
          countryError={countryError}
          employeeLoading={employeeLoading}
          onSubmit={handleSaveEmployee}
          onClose={handleCloseForm}
        />
      )}

      {deleteEmployeeId && (
        <ConfirmModal
          title="Delete Employee"
          message="Are you sure you want to delete this employee?"
          onConfirm={confirmDelete}
          onCancel={() => setDeleteEmployeeId(null)}
        />
      )}
    </div>
  );
}

export default EmployeePage;