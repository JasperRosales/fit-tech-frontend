import { adminAPI } from '../lib/api-config';

// Privilege Service - User privilege management
export const privilegeService = {
  // Check user privilege by email
  checkPrivilege: (email) => 
    adminAPI.get('/admin/privilege/check', { params: { email } }),
};
