import { Suspense, lazy, useEffect, useRef, useState } from 'react';

const LazySpline = lazy(() => import('@splinetool/react-spline'));

// The Spline runtime pulls ~4MB of WebGL/physics/font code. Decide once, up front,
// whether this device should pay for it at all.
const canRender3D = () => {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (window.matchMedia('(max-width: 767px)').matches) return false;
  if (navigator.deviceMemory && navigator.deviceMemory < 4) return false;
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return false;

  const conn = navigator.connection;
  if (conn && (conn.saveData || /2g$/.test(conn.effectiveType || ''))) return false;

  return true;
};

// Static stand-in that matches the scene's colour so the hero never looks empty.
const Backdrop = ({ pulse = false }) => (
  <div
    aria-hidden="true"
    className={`w-full h-full ${pulse ? 'animate-pulse' : ''}`}
    style={{
      background:
        'radial-gradient(ellipse 80% 60% at 50% 35%, rgba(139,92,246,0.22), rgba(10,10,10,0) 70%)'
    }}
  />
);

const DeferredSpline = ({ scene }) => {
  const hostRef = useRef(null);
  const [allowed] = useState(canRender3D);
  const [idle, setIdle] = useState(false);
  // Without IntersectionObserver there is nothing to gate on, so start visible.
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined');

  // Let the page finish painting and settle before touching the 3D chunk.
  useEffect(() => {
    if (!allowed) return;

    const supportsIdle = typeof window.requestIdleCallback === 'function';
    const request = supportsIdle
      ? (cb) => window.requestIdleCallback(cb, { timeout: 4000 })
      : (cb) => window.setTimeout(cb, 400);
    const cancel = supportsIdle
      ? (h) => window.cancelIdleCallback(h)
      : (h) => window.clearTimeout(h);

    const handle = request(() => setIdle(true));
    return () => cancel(handle);
  }, [allowed]);

  // Mount only while the hero is on screen — unmounting stops Spline's render
  // loop, which otherwise keeps burning GPU after you scroll past it.
  useEffect(() => {
    if (!allowed) return;

    const el = hostRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '150px' }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, [allowed]);

  const active = allowed && idle && inView;

  return (
    <div ref={hostRef} className="w-full h-full">
      {active ? (
        <Suspense fallback={<Backdrop pulse />}>
          <LazySpline scene={scene} />
        </Suspense>
      ) : (
        <Backdrop />
      )}
    </div>
  );
};

export default DeferredSpline;
