export interface ApiResult<T> {
  data: T;
  message: string;
  status: string;
};

export interface ApiError {
  message: string;
  status: string;
}