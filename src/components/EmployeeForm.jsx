import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addEmployee, editEmployee } from "../store/employeeSlice";
import { fetchCountries } from "../store/countrySlice";

function EmployeeForm({ employee, onClose }) {
  const dispatch = useDispatch();

  const { loading: employeeLoading } = useSelector(
    (state) => state.employees
  );

  const {
    countries,
    loading: countryLoading,
    error: countryError,
  } = useSelector((state) => state.countries);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    country: "",
    state: "",
    district: "",
  });

  const [errors, setErrors] = useState({});

  const isEditMode = Boolean(employee);

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries());
    }
  }, [dispatch, countries.length]);

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || "",
        email: employee.email || "",
        mobile: employee.mobile || "",
        country: employee.country || "",
        state: employee.state || "",
        district: employee.district || "",
      });
    }
  }, [employee]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must contain 10 digits";
    }

    if (!formData.country) {
      newErrors.country = "Country is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.district.trim()) {
      newErrors.district = "District is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (isEditMode) {
        await dispatch(
          editEmployee({
            id: employee.id,
            employee: formData,
          })
        ).unwrap();
      } else {
        await dispatch(addEmployee(formData)).unwrap();
      }

      onClose();
    } catch (error) {
      console.error("Failed to save employee:", error);
    }
  };

  return (
    <div className="form-overlay">
      <div className="employee-form-container">
        <div className="form-header">
          <h2>{isEditMode ? "Edit Employee" : "Add Employee"}</h2>

          <button
            type="button"
            className="close-button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

       <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Name</label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
              />

              {errors.name && (
                <span className="field-error">{errors.name}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
              />

              {errors.email && (
                <span className="field-error">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="mobile">Mobile</label>

              <input
                id="mobile"
                name="mobile"
                type="text"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter 10 digit mobile number"
              />

              {errors.mobile && (
                <span className="field-error">{errors.mobile}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="country">Country</label>

              {countryLoading ? (
                <select id="country" disabled>
                  <option>Loading countries...</option>
                </select>
              ) : (
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option value="">Select country</option>

                 {countries.map((country) => (
  <option
    key={country.id}
    value={country.country}
  >
    {country.country}
  </option>
))}
                </select>
              )}

              {countryError && (
                <span className="field-error">{countryError}</span>
              )}

              {errors.country && (
                <span className="field-error">{errors.country}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="state">State</label>

              <input
                id="state"
                name="state"
                type="text"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter state"
              />

              {errors.state && (
                <span className="field-error">{errors.state}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="district">District</label>

              <input
                id="district"
                name="district"
                type="text"
                value={formData.district}
                onChange={handleChange}
                placeholder="Enter district"
              />

              {errors.district && (
                <span className="field-error">{errors.district}</span>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-button"
              disabled={employeeLoading || countryLoading}
            >
              {employeeLoading
                ? "Saving..."
                : isEditMode
                  ? "Update Employee"
                  : "Add Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;