import { ApiError, ApiResult } from "@/common/helpers/common.model";
import { useMutation, UseMutationOptions, UseMutationResult } from "@tanstack/react-query";
import { LoginInput, LoginModel, NoteCreateInput, NoteIdInput, NoteModel, RegisterInput, RegisterModel } from "./model";
import { MutationFetchFunction } from "@/common/helpers/common";

export function useLogin(
  options?: UseMutationOptions<ApiResult<LoginModel>, ApiError, LoginInput>
): UseMutationResult<ApiResult<LoginModel>, ApiError, LoginInput> {
  return useMutation<ApiResult<LoginModel>, ApiError, LoginInput>({
    mutationFn: async function (body) {
      return await MutationFetchFunction({
        url: 'login',
        method: 'POST',
        body,
      })
    },
    ...options,
  });
};

export function useRegister(
  options?: UseMutationOptions<ApiResult<RegisterModel>, ApiError, RegisterInput>
): UseMutationResult<ApiResult<RegisterModel>, ApiError, RegisterInput> {
  return useMutation<ApiResult<RegisterModel>, ApiError, RegisterInput>({
    mutationFn: async function (body) {
      return await MutationFetchFunction({
        url: 'register',
        method: 'POST',
        body,
      })
    },
    ...options,
  });
};

export function useAddNote(
  options?: UseMutationOptions<ApiResult<NoteModel>, ApiError, NoteCreateInput>
): UseMutationResult<ApiResult<NoteModel>, ApiError, NoteCreateInput> {
  return useMutation<ApiResult<NoteModel>, ApiError, NoteCreateInput>({
    mutationFn: async function (body) {
      return await MutationFetchFunction({
        url: 'notes',
        method: 'POST',
        body,
      })
    },
    ...options,
  });
};

export function useDeleteNote(
  options?: UseMutationOptions<ApiResult<null>, ApiError, NoteIdInput>
): UseMutationResult<ApiResult<null>, ApiError, NoteIdInput> {
  return useMutation<ApiResult<null>, ApiError, NoteIdInput>({
    mutationFn: async function (body) {
      return await MutationFetchFunction({
        url: `/notes/${body.noteId}`,
        method: 'DELETE',
        body,
      })
    },
    ...options,
  });
};

export function useArchiveNote(
  options?: UseMutationOptions<ApiResult<null>, ApiError, NoteIdInput>
): UseMutationResult<ApiResult<null>, ApiError, NoteIdInput> {
  return useMutation<ApiResult<null>, ApiError, NoteIdInput>({
    mutationFn: async function (body) {
      return await MutationFetchFunction({
        url: `/notes/${body.noteId}/archive`,
        method: 'POST',
        body,
      })
    },
    ...options,
  });
};

export function useUnarchiveNote(
  options?: UseMutationOptions<ApiResult<null>, ApiError, NoteIdInput>
): UseMutationResult<ApiResult<null>, ApiError, NoteIdInput> {
  return useMutation<ApiResult<null>, ApiError, NoteIdInput>({
    mutationFn: async function (body) {
      return await MutationFetchFunction({
        url: `/notes/${body.noteId}/unarchive`,
        method: 'POST',
        body,
      })
    },
    ...options,
  });
};