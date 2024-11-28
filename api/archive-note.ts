import { fetchWithAuth } from "./fetch-with-auth";

export const archiveNote = async (id: string) => {
  const response = await fetchWithAuth(`/notes/${id}/archive`, {
    method: 'POST'
  });
  
  return response;
}