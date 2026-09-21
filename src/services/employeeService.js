import api from "./api";

export const getEmployees = async () => {
  const response = await api.get("/employee");
  return response.data;
};

export const getEmployeeById = async (id) => {
  const response = await api.get(`/employee/${id}`);
  return response.data;
};

export const createEmployee = async (employee) => {
  const response = await api.post("/employee", employee);
  return response.data;
};

export const updateEmployee = async (id, employee) => {
  const response = await api.put(`/employee/${id}`, employee);
  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await api.delete(`/employee/${id}`);
  return response.data;
};
