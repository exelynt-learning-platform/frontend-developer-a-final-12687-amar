import { describe, expect, it, vi } from "vitest";

import api from "../services/api";
import { getCountries } from "../services/countryService";

vi.mock("../services/api", () => ({
  default: {
    get: vi.fn(),
  },
}));

describe("countryService", () => {
  it("gets countries successfully", async () => {
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

    api.get.mockResolvedValue({
      data: countries,
    });

    const result = await getCountries();

    expect(api.get).toHaveBeenCalledWith("/country");
    expect(result).toEqual(countries);
  });

  it("throws error when getting countries fails", async () => {
    const error = new Error("Failed to load countries");

    api.get.mockRejectedValue(error);

    await expect(getCountries()).rejects.toThrow(
      "Failed to load countries"
    );

    expect(api.get).toHaveBeenCalledWith("/country");
  });
});