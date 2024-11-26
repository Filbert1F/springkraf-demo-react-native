import getToken from "@/utils/get-token";

export const postNote = async (title: string, body: string) => {
  const token = await getToken()
  const url = 'https://notes-api.dicoding.dev/v1/notes';
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      title: title,
      body: body
    })
  }

  const res = await fetch(url, options)
  const json = await res.json()

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
}