

import { useState, useEffect } from 'react';
import { banService } from '@/services/banService';

/**
 * Custom hook to detect if a user is banned
 * @param {number} userId - The user ID to check
 * @returns {Object} - { isBanned: boolean, banDetails: Object|null, loading: boolean, error: string|null }
 */
export const useBanDetection = (userId) => {
  const [isBanned, setIsBanned] = useState(false);
  const [banDetails, setBanDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setIsBanned(false);
      setBanDetails(null);
      setError(null);
      return;
    }

    const checkBanStatus = async () => {
      setLoading(true);
      setError(null);

      try {

        // For now, we'll fetch banned users and filter client-side
        // In production, you might want to add a specific endpoint to check a single user's ban status
        const bannedData = await banService.getBannedUsers({ limit: 1000 });
        const userBan = Array.isArray(bannedData) ? bannedData.find(ban => ban.user_id === userId) : null;
        
        if (userBan) {
          setIsBanned(true);
          setBanDetails(userBan);
        } else {
          setIsBanned(false);
          setBanDetails(null);
        }
      } catch (err) {
        console.error('Failed to check ban status:', err);
        setError('Failed to check ban status');
        setIsBanned(false);
        setBanDetails(null);
      } finally {
        setLoading(false);
      }
    };

    checkBanStatus();
  }, [userId]);

  return {
    isBanned,
    banDetails,
    loading,
    error,
    refetch: () => {
      if (userId) {
        // Trigger re-check by calling the effect again
        setIsBanned(false);
        setBanDetails(null);
        setError(null);
      }
    }
  };
};
