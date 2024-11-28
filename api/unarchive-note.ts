import { fetchWithAuth } from "./fetch-with-auth";

export const unarchiveNote = async (id: string) => {
  const response = await fetchWithAuth(`/notes/${id}/unarchive`, {
    method: 'POST'
  });
  
  return response;
}