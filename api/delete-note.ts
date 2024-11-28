import { fetchWithAuth } from "./fetch-with-auth";

export const deleteNote = async (id: string) => {
  const response = await fetchWithAuth(`/notes/${id}`, {
    method: 'DELETE'
  });
  
  return response;
};