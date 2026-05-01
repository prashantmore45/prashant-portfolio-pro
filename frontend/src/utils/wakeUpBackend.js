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
 * Set up aggressive pinging to keep backend alive
 * - Immediate ping on app load
 * - Retry after 3 seconds if first attempt fails
 * - Ping every 5 minutes during user activity
 * - Aggressive ping every 2 minutes during first 5 minutes
 */
export const setupBackendHeartbeat = () => {
  console.log('🚀 Setting up backend heartbeat...');
  
  // Initial aggressive wake-up attempt
  wakeUpBackend().then(success => {
    if (!success) {
      // Retry after 3 seconds if first attempt fails
      setTimeout(() => {
        console.log('🔄 Retrying backend wake-up...');
        wakeUpBackend();
      }, 3000);
    }
  });
  
  // Aggressive pinging in first 5 minutes (every 2 minutes)
  let aggressiveCount = 0;
  const aggressiveInterval = setInterval(() => {
    aggressiveCount++;
    if (aggressiveCount <= 2) {
      console.log('💪 Aggressive ping attempt ' + aggressiveCount);
      wakeUpBackend();
    } else {
      clearInterval(aggressiveInterval);
      // Switch to normal heartbeat after 5 minutes
      console.log('✅ Switching to normal heartbeat');
    }
  }, 120000); // 2 minutes
  
  // Regular heartbeat every 4 minutes after aggressive phase
  const regularInterval = setInterval(() => {
    console.log('💓 Regular heartbeat ping');
    wakeUpBackend();
  }, 240000); // 4 minutes
  
  // Cleanup function to clear intervals if needed
  return () => {
    clearInterval(aggressiveInterval);
    clearInterval(regularInterval);
  };
};
