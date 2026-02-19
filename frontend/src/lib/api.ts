export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function fetcher<T = unknown>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${path}`;

  const token = localStorage.getItem('auth_token');

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    let errorMessage = `HTTP ${res.status}`;

    try {
      const errorData = await res.json();
      if (errorData.detail) {
        errorMessage = errorData.detail;
      } else if (typeof errorData === 'object') {
        const fieldErrors = Object.entries(errorData)
          .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`)
          .join('; ');
        errorMessage = fieldErrors || errorMessage;
      }
    } catch {
      try {
        const errorText = await res.text();
        errorMessage = errorText || errorMessage;
      } catch {
        // Use default error message
      }
    }

    throw new Error(`API error ${res.status}: ${errorMessage}`);
  }

  // Handle 204 No Content
  if (res.status === 204) {
    return undefined as T;
  }

  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return res.json();
  }

  return res.text() as T;
}
