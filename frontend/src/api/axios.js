const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Fetch-based API wrapper (replaces axios)
 * Handles authentication tokens, error handling, and request/response interceptors
 */

// Request interceptor
const applyRequestInterceptor = (options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers['x-auth-token'] = token;
    headers['Authorization'] = `Bearer ${token}`;
  }

  return { ...options, headers };
};

// Response error handler
const handleResponseError = (error, status) => {
  if (status === 401) {
    console.error("⚠️ 401 Unauthorized");
  }
  throw error;
};

const api = {
  get: async (url, config = {}) => {
    const options = applyRequestInterceptor({ ...config, method: 'GET' });
    const response = await fetch(`${BASE_URL}${url}`, options);
    
    if (!response.ok) {
      handleResponseError(new Error(response.statusText), response.status);
    }
    
    return { data: await response.json(), status: response.status };
  },

  post: async (url, data = {}, config = {}) => {
    const options = applyRequestInterceptor({
      ...config,
      method: 'POST',
      body: JSON.stringify(data)
    });
    const response = await fetch(`${BASE_URL}${url}`, options);
    
    if (!response.ok) {
      handleResponseError(new Error(response.statusText), response.status);
    }
    
    return { data: await response.json(), status: response.status };
  },

  put: async (url, data = {}, config = {}) => {
    const options = applyRequestInterceptor({
      ...config,
      method: 'PUT',
      body: JSON.stringify(data)
    });
    const response = await fetch(`${BASE_URL}${url}`, options);
    
    if (!response.ok) {
      handleResponseError(new Error(response.statusText), response.status);
    }
    
    return { data: await response.json(), status: response.status };
  },

  delete: async (url, config = {}) => {
    const options = applyRequestInterceptor({ ...config, method: 'DELETE' });
    const response = await fetch(`${BASE_URL}${url}`, options);
    
    if (!response.ok) {
      handleResponseError(new Error(response.statusText), response.status);
    }
    
    return { data: await response.json(), status: response.status };
  }
};

export default api;