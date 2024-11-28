import { NoteType } from "@/types/note";
import { fetchWithAuth } from "./fetch-with-auth";

export const getNotesArchived = async (title?: string) => {
  const response = await fetchWithAuth<{ data: NoteType[] }>('/notes/archived', {
    method: 'GET'
  });

  if (title !== undefined) {
    return response.data.filter(note => note.title.toLowerCase().includes(title.toLowerCase()));
  }
  
  return response.data;
};