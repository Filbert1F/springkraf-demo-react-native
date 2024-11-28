import { fetchWithAuth } from "./fetch-with-auth";

export const postRegister = async (name: string, email: string, password: string) => {
  const response = await fetchWithAuth('/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password })
  }, false);
  
  return response;
}