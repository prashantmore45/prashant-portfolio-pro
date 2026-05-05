// Detect device capability for animation optimization
export const useAnimationConfig = () => {
  const preferReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Check if device has limited memory (low-end device)
  const isLowEndDevice = (navigator.deviceMemory && navigator.deviceMemory < 4) || 
                        (/iPhone|Android|Mobile/.test(navigator.userAgent) && 
                         !navigator.userAgent.includes('iPad'));

  return {
    shouldAnimate: !preferReducedMotion && !isLowEndDevice,
    duration: isLowEndDevice ? 0.3 : 0.5,
    ease: isLowEndDevice ? "linear" : "easeOut",
    isLowEnd: isLowEndDevice
  };
};

// Detect connection speed
export const useConnectionSpeed = () => {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  
  if (!connection) return 'unknown';
  
  const type = connection.effectiveType; // '4g' | '3g' | '2g' | 'slow-2g'
  const downlink = connection.downlink; // Mbps
  
  return {
    type,
    isSlowConnection: type === '3g' || type === '2g' || type === 'slow-2g',
    downlink
  };
};
