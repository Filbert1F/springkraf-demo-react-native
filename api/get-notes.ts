import { NoteType } from "@/types/note";
import { fetchWithAuth } from "./fetch-with-auth";

export const getNotes = async (title?: string) => {
  const response = await fetchWithAuth<{ data: NoteType[] }>('/notes', {
    method: 'GET'
  });

  if (title !== undefined) {
    return response.data.filter(note => note.title.toLowerCase().includes(title.toLowerCase()));
  }
  
  return response.data;
};