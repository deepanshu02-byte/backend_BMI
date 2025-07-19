import { Types } from "mongoose";

export interface PaginationParams {
  page?: string | number;
  limit?: string | number;
  sortBy?: string;
  sortOrder?: string;
}

export interface PaginationReturn {
  skip?: number;
  limit?: number;
  sort?: number;
}

export type TGetAllQueryParams = {
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  limit?: string;
  offset?: string;
  startDate?: string;
  endDate?: string;
};

export type TGetOnePathParams = {
  id: string | Types.ObjectId;
};
