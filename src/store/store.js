import { configureStore } from "@reduxjs/toolkit";

import employeeReducer from "./employeeSlice";
import countryReducer from "./countrySlice";

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    countries: countryReducer,
  },
});