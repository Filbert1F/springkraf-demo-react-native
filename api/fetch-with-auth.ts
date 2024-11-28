import getToken from "@/utils/get-token";

const baseUrl = 'https://notes-api.dicoding.dev/v1';

export const fetchWithAuth = async <T = any>(
  endpoint: string, 
  options: RequestInit = {},
  requireAuth = true,
  params?: Record<string, string | undefined>
): Promise<T> => {
  const url = new URL(`${baseUrl}${endpoint}`);

  if (params) {
    Object.entries(params)
      .filter(([, value]) => value !== undefined)
      .forEach(([key, value]) => url.searchParams.append(key, value as string));
  }

  const headers: HeadersInit = {
    'accept': 'application/json',
    'content-type': 'application/json',
    ...options.headers
  };

  if (requireAuth) {
    const token = await getToken();
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(url.toString(), {
    ...options,
    headers
  });

  const json = await res.json();

  if (!res.ok) {
    const error = new Error(json.message);
    (error as any).status = res.status;
    throw error;
  }

  return json;
};