import getToken from "@/utils/get-token";
import { ApiError, ApiResult } from "./common.model";

const API_BASE_URL = 'https://notes-api.dicoding.dev/v1';

export const MutationFetchFunction = async <T>(
  { url, method, body }: {
    url: string;
    method: string;
    body?: any;
  }
): Promise<ApiResult<T>> => {
  const token = await getToken();
  const response = await fetch(`${API_BASE_URL}/${url}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorData: ApiError = await response.json();
    throw errorData;
  }

  const rawData: ApiResult<T> = await response.json();

  return rawData;
};

export async function QueryFetchFunction<T, U extends T | T[] = T[]>({
  url,
  params,
  filterBy,
}: {
  url: string;
  params?: string;
  filterBy?: T extends any[] 
    ? keyof T[number]
    : keyof T;
}): Promise<ApiResult<T>> {
  const token = await getToken();
  const response = await fetch(`${API_BASE_URL}/${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    const errorData: ApiError = await response.json();
    throw errorData;
  }

  const data: ApiResult<T> = await response.json();
  
  if (params && data.data && Array.isArray(data.data)) {
    data.data = data.data.filter(item => {
      if (filterBy && filterBy in item) {
        const propertyValue = item[filterBy];
        return propertyValue !== undefined 
          ? String(propertyValue).toLowerCase().includes(params.toLowerCase())
          : false;
      }
      return true;
    }) as T;
  }

  return data;
}