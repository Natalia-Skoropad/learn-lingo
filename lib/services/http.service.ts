type ApiMessageResponse = {
  message?: string;
};

type RequestOptions = RequestInit & {
  fallbackErrorMessage?: string;
};

//===============================================================

async function parseJsonResponse<T>(response: Response): Promise<T | null> {
  return response.json().catch(() => null) as Promise<T | null>;
}

//===============================================================

export async function requestJson<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const { fallbackErrorMessage = 'Request failed', ...fetchOptions } = options;

  const response = await fetch(url, fetchOptions);
  const data = await parseJsonResponse<T & ApiMessageResponse>(response);

  if (!response.ok || !data) {
    throw new Error(data?.message || fallbackErrorMessage);
  }

  return data;
}

//===============================================================

export async function requestVoid(
  url: string,
  options: RequestOptions = {}
): Promise<void> {
  const { fallbackErrorMessage = 'Request failed', ...fetchOptions } = options;

  const response = await fetch(url, fetchOptions);
  const data = await parseJsonResponse<ApiMessageResponse>(response);

  if (!response.ok) {
    throw new Error(data?.message || fallbackErrorMessage);
  }
}

//===============================================================

export async function requestJsonOrNull<T>(
  url: string,
  options: RequestOptions & {
    nullStatuses?: number[];
  } = {}
): Promise<T | null> {
  const {
    fallbackErrorMessage = 'Request failed',
    nullStatuses = [401],
    ...fetchOptions
  } = options;

  const response = await fetch(url, fetchOptions);

  if (nullStatuses.includes(response.status)) {
    return null;
  }

  const data = await parseJsonResponse<T & ApiMessageResponse>(response);

  if (!response.ok || !data) {
    throw new Error(data?.message || fallbackErrorMessage);
  }

  return data;
}
