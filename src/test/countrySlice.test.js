import { describe, expect, it } from "vitest";

import countryReducer, {
  clearCountryError,
  fetchCountries,
} from "../store/countrySlice";

const initialState = {
  countries: [],
  loading: false,
  error: null,
};

const countries = [
  {
    id: "1",
    country: "India",
  },
  {
    id: "2",
    country: "United States",
  },
];

describe("countrySlice", () => {
  it("handles clearCountryError", () => {
    const state = {
      ...initialState,
      error: "Failed to load countries",
    };

    const result = countryReducer(
      state,
      clearCountryError()
    );

    expect(result.error).toBeNull();
  });

  it("handles fetchCountries.pending", () => {
    const result = countryReducer(
      initialState,
      fetchCountries.pending("request-1")
    );

    expect(result.loading).toBe(true);
    expect(result.error).toBeNull();
  });

  it("handles fetchCountries.fulfilled", () => {
    const result = countryReducer(
      initialState,
      fetchCountries.fulfilled(
        countries,
        "request-1"
      )
    );

    expect(result.loading).toBe(false);
    expect(result.countries).toEqual(countries);
  });

  it("handles fetchCountries.rejected", () => {
    const result = countryReducer(
      initialState,
      fetchCountries.rejected(
        new Error("API Error"),
        "request-1",
        undefined,
        "Failed to load countries"
      )
    );

    expect(result.loading).toBe(false);
    expect(result.error).toBe(
      "Failed to load countries"
    );
  });
});