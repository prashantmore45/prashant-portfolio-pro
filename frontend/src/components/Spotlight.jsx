import { useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useSpring } from 'framer-motion';

const SIZE = 500;

const Spotlight = () => {
  // Motion values are written outside React, so tracking the cursor never
  // triggers a re-render (the old version re-rendered on every mousemove).
  const x = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 - SIZE / 2 : 0);
  const y = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 - SIZE / 2 : 0);

  const springX = useSpring(x, { stiffness: 120, damping: 25, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 120, damping: 25, mass: 0.4 });

  useEffect(() => {
    let frame = 0;
    let nextX = 0;
    let nextY = 0;

    const handleMove = (e) => {
      nextX = e.clientX;
      nextY = e.clientY;
      if (frame) return; // coalesce to one write per animation frame

      frame = requestAnimationFrame(() => {
        frame = 0;
        x.set(nextX - SIZE / 2);
        y.set(nextY - SIZE / 2);
      });
    };

    window.addEventListener('mousemove', handleMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: springX, y: springY, width: SIZE, height: SIZE }}
      className="fixed top-0 left-0 bg-primary/20 rounded-full blur-[64px] pointer-events-none z-0 will-change-transform"
    />
  );
};

export default Spotlight;
