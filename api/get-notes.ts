import { NoteType } from "@/types/note";
import getToken from "@/utils/get-token";
import removeToken from "@/utils/remove-token";

export const getNotes = async (title: string | undefined) => {
  const token = await getToken()
  const url = 'https://notes-api.dicoding.dev/v1/notes';
  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
  }

  const res = await fetch(url, options)

  const json = await res.json()

  console.log(json)

  if (!res.ok) {
    const error = new Error(json.message);
    (error as any).status = res.status;
    
    throw error;
  }

  const notes = json.data as NoteType[]

  console.log(title)

  if (title !== undefined) {
    return notes.filter(((el) => el.title.includes(title)))
  }
  
  return notes
}