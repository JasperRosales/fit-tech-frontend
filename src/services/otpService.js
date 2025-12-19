import { authAPI } from '../lib/api-config';

// OTP Service - One-time password operations
export const otpService = {
  // Generate OTP
  generateOTP: (data) => 
    authAPI.post('/otp/generate', data),
  
  // Verify OTP
  verifyOTP: (data) => 
    authAPI.post('/otp/verify', data),
  
  // Resend OTP
  resendOTP: (data) => 
    authAPI.post('/otp/resend', data),
  
  // Get OTP status
  getOTPStatus: (params) => 
    authAPI.get('/otp/status', { params }),
  
  // Cleanup expired OTPs
  cleanupExpiredOTPs: () => 
    authAPI.delete('/otp/cleanup'),
};
