import { fetchWithAuth } from "./fetch-with-auth";

export const postLogin = async (email: string, password: string) => {
  const response = await fetchWithAuth('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  }, false);
  
  return response;
}