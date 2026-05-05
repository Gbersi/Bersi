import axios from 'axios';

// --- Configuration ---
const API_BASE_URL = 'https://api.yourdomain.com/v1';

// Create a dedicated Axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// State for handling token refreshes
let isRefreshing = false;
let failedQueue = [];

// Helper to process the paused requests once a new token is acquired
const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// ==========================================
// 1. REQUEST INTERCEPTOR
// ==========================================
// This runs BEFORE every single request leaves your browser
api.interceptors.request.use(
    (config) => {
        // Grab the current token from storage (localStorage, cookies, etc.)
        const token = localStorage.getItem('access_token');
        
        if (token) {
            // Attach it to the Authorization header
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ==========================================
// 2. RESPONSE INTERCEPTOR
// ==========================================
// This runs EVERY TIME the server sends a response back
api.interceptors.response.use(
    (response) => {
        // Any status code of 2xx goes here. Pass it right through.
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // If the error is NOT a 401, or if it's a 401 but we've already retried, reject it normally.
        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        // If we get a 401, mark this request so we don't end up in an infinite loop
        originalRequest._retry = true;

        if (isRefreshing) {
            // If another request already triggered the refresh process, we pause THIS request 
            // and add it to a queue. It will resolve once the first request finishes refreshing.
            return new Promise(function(resolve, reject) {
                failedQueue.push({ resolve, reject });
            }).then(token => {
                originalRequest.headers['Authorization'] = 'Bearer ' + token;
                return api(originalRequest);
            }).catch(err => {
                return Promise.reject(err);
            });
        }

        // Lock the refresh process so subsequent 401s get queued up
        originalRequest._retry = true;
        isRefreshing = true;

        try {
            // Grab the refresh token (usually longer-lived than the access token)
            const refreshToken = localStorage.getItem('refresh_token');
            if (!refreshToken) throw new Error('No refresh token available');

            // Make a standard axios call to get a new token (do NOT use the 'api' instance here 
            // or you will trigger the interceptors again!)
            const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                token: refreshToken
            });

            const newAccessToken = response.data.access_token;
            
            // Save the new token
            localStorage.setItem('access_token', newAccessToken);
            
            // Apply the new token to our current failed request
            api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            
            // Release the queue and replay any paused requests
            processQueue(null, newAccessToken);
            
            // Finally, retry the original request that failed
            return api(originalRequest);

        } catch (refreshError) {
            // If the refresh token is ALSO expired, the user is truly logged out.
            // Flush the queue with errors, clear storage, and redirect to login.
            processQueue(refreshError, null);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login';
            
            return Promise.reject(refreshError);
        } finally {
            // Always unlock the refreshing state when done
            isRefreshing = false;
        }
    }
);

export default api;