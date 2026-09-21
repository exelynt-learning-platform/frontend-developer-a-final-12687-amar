import api from "./api";

export const getCountries = async () => {
  const response = await api.get("/country");
  return response.data;
};