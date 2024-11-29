import { ApiError, ApiResult } from "@/common/helpers/common.model";
import { QueryKey, useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { NoteModel } from "./model";
import { QueryFetchFunction } from "@/common/helpers/common";

export function useGetNotes(
  input: string,
  filterBy?: keyof NoteModel,
  options?: Omit<UseQueryOptions<ApiResult<NoteModel[]>, ApiError>, 'queryKey'> & {
    queryKey?: QueryKey;
  }
): UseQueryResult<ApiResult<NoteModel[]>, ApiError> {
  const baseQueryKey = ['notes', input, filterBy];

  return useQuery({
    queryKey: options?.queryKey || baseQueryKey,
    queryFn: () =>
      QueryFetchFunction<NoteModel[]>({
        url: 'notes',
        params: input,
        filterBy,
      }),
    ...options,
  });
}
 
export function useGetArchivedNotes(
  input: string,
  filterBy?: keyof NoteModel,
  options?: Omit<UseQueryOptions<ApiResult<NoteModel[]>, ApiError>, 'queryKey'> & {
    queryKey?: QueryKey;
  }
): UseQueryResult<ApiResult<NoteModel[]>, ApiError> {
  const baseQueryKey = ['notes-archived', input, filterBy];
  
  return useQuery({
    queryKey: options?.queryKey || baseQueryKey,
    queryFn: () =>
      QueryFetchFunction<NoteModel[]>({
        url: 'notes/archived',
        params: input,
        filterBy,
      }),
    ...options,
  });
}

export function useGetNote(
  input: string,
  options?: Omit<UseQueryOptions<ApiResult<NoteModel>, ApiError>, 'queryKey'> & {
    queryKey?: QueryKey;
  }
): UseQueryResult<ApiResult<NoteModel>, ApiError> {
  const baseQueryKey = ['notes', input];
  
  return useQuery({
    queryKey: options?.queryKey || baseQueryKey,
    queryFn: () =>
      QueryFetchFunction<NoteModel>({
        url: `notes/${input}`,
      }),
    ...options,
  });
}