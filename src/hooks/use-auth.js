

import { useState, useCallback, useEffect, useRef } from "react";
import { login, refreshAccessToken, logout, validateToken, register, authAPI } from "../services";


const REFRESH_TOKEN_KEY = 'refresh_token'; 
const ACCESS_TOKEN_KEY = 'access_token';
const USER_ID_KEY = 'userId';
const USER_ROLE_KEY = 'userRole';
const USER_EMAIL_KEY = 'userEmail';

export const useAuth = () => {



  const [authState, setAuthState] = useState(() => {
    const hasRefreshToken = !!localStorage.getItem(REFRESH_TOKEN_KEY);
    const hasAccessToken = !!localStorage.getItem(ACCESS_TOKEN_KEY);
    const isLoggedIn = hasRefreshToken && hasAccessToken;
    
    return {
      isLoggedIn: isLoggedIn,
      userId: isLoggedIn ? localStorage.getItem(USER_ID_KEY) : null,
      userRole: isLoggedIn ? (localStorage.getItem(USER_ROLE_KEY) || 'user') : null,
      userName: isLoggedIn ? (localStorage.getItem('userName') || 'User') : null,
      userEmail: isLoggedIn ? localStorage.getItem(USER_EMAIL_KEY) : null,
      accessToken: isLoggedIn ? localStorage.getItem(ACCESS_TOKEN_KEY) : null,
      refreshToken: isLoggedIn ? localStorage.getItem(REFRESH_TOKEN_KEY) : null,
      isLoading: false,
      error: null,
    };
  });

  const logoutRef = useRef(null);


  const handleLogout = useCallback(async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

    try {
      if (refreshToken) {
        await logout();
      }
    } catch (err) {
      console.error('Logout failed on backend:', err);
      // Continue with logout even if backend call fails
    } finally {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(USER_ID_KEY);
      localStorage.removeItem(USER_ROLE_KEY);
      localStorage.removeItem(USER_EMAIL_KEY);
      localStorage.removeItem('userName');
      setAuthState({
        isLoggedIn: false,
        userId: null,
        userRole: null,
        userName: null,
        userEmail: null,
        accessToken: null,
        refreshToken: null,
        isLoading: false,
        error: null,
      });
    }
  }, []);

  // Keep ref updated
  useEffect(() => {
    logoutRef.current = handleLogout;
  }, [handleLogout]);






  const handleAuthSuccess = useCallback((authData) => {
    const { userId, accessToken, refreshToken, userRole = 'user', userEmail = '', userName = 'User' } = authData;
    
    localStorage.setItem(USER_ID_KEY, userId);
    localStorage.setItem(USER_ROLE_KEY, userRole);
    localStorage.setItem(USER_EMAIL_KEY, userEmail);
    localStorage.setItem('userName', userName);
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    
    setAuthState({
      isLoggedIn: true,
      userId: userId,
      userRole: userRole,
      userName: userName,
      userEmail: userEmail,
      accessToken: accessToken,
      refreshToken: refreshToken,
      isLoading: false,
      error: null,
    });
  }, []);






  const authLogin = useCallback(async (email, password) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const authData = await login({ email, password }); 
      handleAuthSuccess(authData);
      return authData.userId;
    } catch (err) {
      setAuthState(prev => ({ ...prev, isLoading: false, error: err.message || 'Login failed.' }));
      throw err;
    }
  }, [handleAuthSuccess]);



  // Register function
  const authRegister = useCallback(async (email, password, role = 'user') => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const authData = await register({ email, password, role }); 
      // Clear loading state but don't set logged in state
      // User will be redirected to login after successful registration
      setAuthState(prev => ({ ...prev, isLoading: false, error: null }));
      return { userId: authData.userId, userRole: authData.userRole };
    } catch (err) {
      setAuthState(prev => ({ ...prev, isLoading: false, error: err.message || 'Registration failed.' }));
      throw err;
    }
  }, []);

  // Don't validate token automatically on mount - only validate when making API calls
  // This prevents infinite loops when backend is not available
  useEffect(() => {


  // Only clear invalid tokens if no refresh token exists
    if (!localStorage.getItem(REFRESH_TOKEN_KEY) || !localStorage.getItem(ACCESS_TOKEN_KEY)) {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(USER_ID_KEY);
      localStorage.removeItem(USER_ROLE_KEY);
      localStorage.removeItem(USER_EMAIL_KEY);
      localStorage.removeItem('userName');
    }
  }, []);


  // Set up response interceptor for automatic token refresh
  useEffect(() => {
    const responseInterceptor = authAPI.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403) &&
          !originalRequest._retry &&
          refreshToken
        ) {
          originalRequest._retry = true;
          try {
            const { accessToken, refreshToken: newRefreshToken } = await refreshAccessToken({ refreshToken });
            localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
            localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken);
            return authAPI(originalRequest);
          } catch (refreshError) {
            // Refresh failed, logout user
            logoutRef.current && logoutRef.current();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      authAPI.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return {
    ...authState,
    login: authLogin,
    register: authRegister,
    logout: handleLogout,
    hasRole: (role) => authState.userRole === role,
    isAdmin: () => authState.userRole === 'admin',
    isStaff: () => authState.userRole === 'staff',
    isUser: () => authState.userRole === 'user',
  };
};
