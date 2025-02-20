import { AxiosInstance as axios } from "../../Axios";
import {
  Dog,
  DogsSearchFilters,
  DogsSearchRequest,
  DogsSearchResponse,
  GetMatchResponse,
} from "./dogs.model";

const DOGS_BASE = "/dogs";

const parameterizeFilters = <T>(filters: Partial<T>): string => {
  let str = "";
  let op = "?";
  const keys = Object.keys(filters);

  if (!keys?.length) {
    return "";
  }

  keys.forEach((key) => {
    const val = filters[key as keyof T];
    if (val) {
      const keyVal = `${key}=${val}`;
      str += op + keyVal;
    }
    if (op !== "&" && str.length) {
      op = "&";
    }
  });
  return str;
};

export const dogsService = {
  getDogBreeds: async () => {
    try {
      const res = await axios.get<string[]>(DOGS_BASE + "/breeds");
      return res?.data;
    } catch (e) {
      console.error(e);
    }
  },
  searchDogs: async (filters: DogsSearchFilters) => {
    try {
      const { sort, ...rest } = filters;

      const sortStr = sort?.field
        ? `${sort.field}:${sort.direction}`
        : "breed:asc";

      const request = {
        ...rest,
        sort: sortStr,
      };

      const url =
        DOGS_BASE + "/search" + parameterizeFilters<DogsSearchRequest>(request);
      const res = await axios.get<DogsSearchResponse>(url);
      return res?.data;
    } catch (e) {
      console.error(e);
    }
  },
  fetchDogs: async (ids: string[]) => {
    try {
      if (ids?.length > 100) {
        throw "Exceeds ids limit";
      }
      const res = await axios.post<Dog[]>(DOGS_BASE, ids);
      return res?.data;
    } catch (e) {
      console.error(e);
    }
  },
  getMatch: async (ids: string[]) => {
    try {
      const res = await axios.post<GetMatchResponse>(DOGS_BASE + "/match", ids);
      return res?.data.match;
    } catch (e) {
      console.error(e);
    }
  },
};
