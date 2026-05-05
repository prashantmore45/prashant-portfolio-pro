const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const isMobile = () => /iPhone|Android|Mobile/.test(navigator.userAgent);
const isOnline = () => navigator.onLine;

const HEARTBEAT_INTERVALS = {
  mobile: 10 * 60 * 1000,
  desktop: 5 * 60 * 1000
};

export const wakeUpBackend = async () => {
  if (!isOnline()) return false;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`${BACKEND_URL}/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch {
    return false;
  }
};

export const setupBackendHeartbeat = () => {
  const isOnMobile = isMobile();
  const interval = isOnMobile ? HEARTBEAT_INTERVALS.mobile : HEARTBEAT_INTERVALS.desktop;
  
  // Initial wake-up with retry
  wakeUpBackend().then(success => {
    if (!success && isOnline()) {
      setTimeout(() => wakeUpBackend(), 3000);
    }
  });

  // Heartbeat interval
  let heartbeatInterval = setInterval(() => {
    if (isOnline()) wakeUpBackend();
  }, interval);

  // Pause/resume on visibility change
  const handleVisibilityChange = () => {
    if (document.hidden) {
      clearInterval(heartbeatInterval);
    } else {
      wakeUpBackend();
      heartbeatInterval = setInterval(() => {
        if (isOnline()) wakeUpBackend();
      }, interval);
    }
  };

  // Handle connectivity changes
  const handleOnline = () => wakeUpBackend();
  const handleOffline = () => clearInterval(heartbeatInterval);

  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  return () => {
    clearInterval(heartbeatInterval);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};
