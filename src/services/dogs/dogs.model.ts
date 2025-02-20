export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface GetDogsRequest {
  ids?: string[];
}

export type DogsSortField = "breed" | "name" | "age";
export type SortDirection = "asc" | "desc";

export interface DogsSortModel {
  field: DogsSortField;
  direction: SortDirection;
}

export interface DogsSearchRequest {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sort?: string;
}

export interface DogsSearchFilters extends Omit<DogsSearchRequest, "sort"> {
  sort?: DogsSortModel;
}

export interface DogsSearchResponse {
  resultIds: string[];
  total: number;
  next: string;
  prev: string;
}

export interface GetMatchResponse {
  match: string; //id of matched dog
}
