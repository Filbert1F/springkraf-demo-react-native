export const postLogin = async (email: string, password: string) => {
  const url = 'https://notes-api.dicoding.dev/v1/login';
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  }

  const res = await fetch(url, options)
  const json = await res.json()

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
}