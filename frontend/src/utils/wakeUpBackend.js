/**
 * Utility to wake up Render backend from sleep
 * Render free tier puts services to sleep after 15 mins of inactivity
 * This function pings the health endpoint to keep it awake
 */

const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const wakeUpBackend = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend is awake:', data.status);
      return true;
    }
  } catch (error) {
    console.warn('⚠️ Backend wake-up attempt failed (may be starting):', error.message);
    // This is not critical - backend may take a moment to start
    return false;
  }
};

/**
 * Set up periodic pings to keep backend alive
 * Pings every 10 minutes (600000ms) to prevent sleep
 */
export const setupBackendHeartbeat = () => {
  // Initial wake-up attempt
  wakeUpBackend();
  
  // Periodic ping every 10 minutes
  const interval = setInterval(() => {
    wakeUpBackend();
  }, 600000); // 10 minutes
  
  // Cleanup function to clear interval if needed
  return () => clearInterval(interval);
};
