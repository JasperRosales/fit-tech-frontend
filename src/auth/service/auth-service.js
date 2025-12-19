
import { authAPI } from './auth-api';

/**
 * Handles user registration.
 */

export const register = async (email, password) => {
  try {
    const response = await authAPI.post('/register', { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

/**
 * Handles user login.
 * The access_token is set as an HTTP-only cookie by the backend.
 * The refresh token is returned in the response body.
 */

export const login = async (email, password) => {
  try {
    const response = await authAPI.post('/login', { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

/**
 * Validates the current refresh token.
 * Throws an error if the token is invalid or expired.
 */

export const validateToken = async (refreshToken) => {
  try {
    const response = await authAPI.post('/validate', { refreshToken });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      throw new Error('Token expired or invalid');
    }
    throw new Error(error.response?.data?.message || 'Token validation failed');
  }
};

/**
 * Handles access token refresh.
 * Sends the long-lived refresh token in the body.
 * The backend sets a new access_token cookie upon success.
 */

export const refreshAccessToken = async (refreshToken) => {
  try {
    await authAPI.post('/refresh', { refreshToken });
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      throw new Error('Refresh token expired');
    }
    throw new Error(error.response?.data?.message || 'Token refresh failed');
  }
};

/**
 * Handles user logout.
 * Clears the refresh cookie on the backend.
 */

export const logout = async (userId) => {
  try {
    await authAPI.post('/logout', { userId });
  } catch (error) {
    // Don't throw on logout errors, just log them
    console.error('Logout API call failed:', error);
    throw new Error(error.response?.data?.message || 'Logout failed');
  }
};
