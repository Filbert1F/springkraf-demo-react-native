import { NoteType } from "@/types/note";
import { fetchWithAuth } from "./fetch-with-auth";

export const getNoteId = async (id: string) => {
  const response = await fetchWithAuth<{ data: NoteType }>(`/notes/${id}`, {
    method: 'GET'
  });
  
  return response.data;
};