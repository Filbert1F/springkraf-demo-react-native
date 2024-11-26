import getToken from "@/utils/get-token";

export const archiveNote = async (id: string) => {
  const token = await getToken()
  const url = `https://notes-api.dicoding.dev/v1/notes/${id}/archive`;
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  }

  const res = await fetch(url, options)
  const json = await res.json()

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
}