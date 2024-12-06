export async function apiFetch(endpoint: string, options?: RequestInit) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL; // Access the environment variable
  const url = `${baseUrl}/${endpoint}`;
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
