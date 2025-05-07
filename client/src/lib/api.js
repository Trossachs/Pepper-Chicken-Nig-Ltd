// API utility functions for Netlify deployment

// Get the base URL for API requests
export const getApiUrl = (endpoint) => {
  // Use Netlify functions in production, local server in development
  const isNetlify = window.location.hostname.includes('netlify.app') || 
                   !window.location.hostname.includes('localhost');
  
  if (isNetlify) {
    return `/.netlify/functions/${endpoint}`;
  } else {
    return `/api/${endpoint}`;
  }
};

// Generic fetch wrapper with error handling
export const fetchApi = async (endpoint, options = {}) => {
  try {
    const url = getApiUrl(endpoint);
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

// API functions
export const getMeals = async () => {
  return fetchApi('get-meals');
};

export const login = async (credentials) => {
  return fetchApi('auth', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });
};

export const submitContact = async (formData) => {
  return fetchApi('contact', {
    method: 'POST',
    body: JSON.stringify(formData)
  });
};