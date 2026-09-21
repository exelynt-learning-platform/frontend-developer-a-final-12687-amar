import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCountries } from "../services/countryService";

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async (_, { rejectWithValue }) => {
    try {
      return await getCountries();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load countries"
      );
    }
  }
);

const initialState = {
  countries: [],
  loading: false,
  error: null,
};

const countrySlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    clearCountryError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })

      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCountryError } = countrySlice.actions;

export default countrySlice.reducer;