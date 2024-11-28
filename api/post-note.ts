import { fetchWithAuth } from "./fetch-with-auth";

export const postNote = async (title: string, body: string) => {
  const response = await fetchWithAuth('/notes', {
    method: 'POST',
    body: JSON.stringify({ title, body })
  });
  
  return response;
}