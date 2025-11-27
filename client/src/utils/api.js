// API base URL - adjust for production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

/**
 * Generic API request function
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add body if provided
  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Menu API
export const menuAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/menu${queryString ? `?${queryString}` : ''}`);
  },
  getById: (id) => apiRequest(`/menu/${id}`),
  create: (data) => apiRequest('/menu', { method: 'POST', body: data }),
  update: (id, data) => apiRequest(`/menu/${id}`, { method: 'PUT', body: data }),
  delete: (id) => apiRequest(`/menu/${id}`, { method: 'DELETE' }),
};

// Categories API
export const categoriesAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/categories${queryString ? `?${queryString}` : ''}`);
  },
  getById: (id) => apiRequest(`/categories/${id}`),
  create: (data) => apiRequest('/categories', { method: 'POST', body: data }),
  update: (id, data) => apiRequest(`/categories/${id}`, { method: 'PUT', body: data }),
  delete: (id) => apiRequest(`/categories/${id}`, { method: 'DELETE' }),
};

// Testimonials API
export const testimonialsAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/testimonials${queryString ? `?${queryString}` : ''}`);
  },
  getById: (id) => apiRequest(`/testimonials/${id}`),
  create: (data) => apiRequest('/testimonials', { method: 'POST', body: data }),
  update: (id, data) => apiRequest(`/testimonials/${id}`, { method: 'PUT', body: data }),
  delete: (id) => apiRequest(`/testimonials/${id}`, { method: 'DELETE' }),
};

export default apiRequest;

