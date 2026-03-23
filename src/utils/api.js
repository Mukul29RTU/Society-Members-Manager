import axios from 'axios';


const api = axios.create({
 baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const publicEndpoints = ['/login', '/register', '/send-otp', '/verify-otp'];
    const isPublic = publicEndpoints.some(endpoint => config.url.endsWith(endpoint));

    if (!isPublic) {
      const token = localStorage.getItem('jwt_token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle ApiResponse and errors
api.interceptors.response.use(
  (response) => {
    // If the response follows our ApiResponse structure
    if (response.data && Object.prototype.hasOwnProperty.call(response.data, 'success')) {
      if (response.data.success) {
        // Automatically unwrap the data field for successful requests
        return response.data.data !== undefined ? response.data.data : response.data;
      } else {
        // If success is false, treat it as an error even if status is 200
        return Promise.reject({
          response: {
            data: { message: response.data.message || 'Operation failed' },
            status: response.status
          }
        });
      }
    }
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('jwt_token');
      // Only redirect if not already on login page to avoid loops
      if (!window.location.pathname.includes('/login')) {
         window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
