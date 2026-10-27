import * as SecureStore from 'expo-secure-store';

// The backend stage comes from the build: EXPO_PUBLIC_API_URL is set per build profile in eas.json.
// For `npx expo start`, set it in .env.local.
export const BASE_API_URL = process.env.EXPO_PUBLIC_API_URL ?? '';
export const S3_API_URL = 'https://hgfitnessimages.s3.af-south-1.amazonaws.com/programCards';

const TOKEN_KEY = 'jwtToken';

export const getToken = () => SecureStore.getItemAsync(TOKEN_KEY);
export const setToken = (token: string) => SecureStore.setItemAsync(TOKEN_KEY, token);
export const clearToken = () => SecureStore.deleteItemAsync(TOKEN_KEY);

export class ApiError extends Error {
  constructor(public status: number, public body: any) {
    super(`API error ${status}: ${body?.message ?? ''}`);
  }
}

type RequestOptions = {
  body?: unknown;       // sent as JSON with a POST
  auth?: boolean;       // send the logged-in user's token (default true)
};

/** Calls the backend and returns its JSON. Throws ApiError for non-2xx responses. */
export async function api<T = any>(path: string, { body, auth = true }: RequestOptions = {}): Promise<T> {
  if (!BASE_API_URL) throw new Error('EXPO_PUBLIC_API_URL is not set');
  const headers: Record<string, string> = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (auth) {
    const token = await getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(`${BASE_API_URL}${path}`, {
    method: body === undefined ? 'GET' : 'POST',
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const json = await response.json().catch(() => ({}));
  if (!response.ok) throw new ApiError(response.status, json);
  return json as T;
}
