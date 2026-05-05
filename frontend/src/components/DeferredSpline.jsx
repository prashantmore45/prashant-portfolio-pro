import { Suspense, lazy } from 'react';

const LazySpline = lazy(() => import('@splinetool/react-spline'));

const DeferredSpline = ({ scene }) => {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-[250px] sm:h-[300px] md:h-[500px] bg-gradient-to-br from-purple-900/20 to-black/50 rounded-lg animate-pulse" />
      }
    >
      <LazySpline scene={scene} />
    </Suspense>
  );
};

export default DeferredSpline;
