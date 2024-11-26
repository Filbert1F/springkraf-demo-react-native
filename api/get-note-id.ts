import { NoteType } from "@/types/note";
import getToken from "@/utils/get-token";
import removeToken from "@/utils/remove-token";

export const getNoteId = async (id: string) => {
  const token = await getToken()
  const url = `https://notes-api.dicoding.dev/v1/notes/${id}`;
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

  return json.data as NoteType;
}