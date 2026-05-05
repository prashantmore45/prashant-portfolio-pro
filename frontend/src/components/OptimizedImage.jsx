import { useState } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  priority = false,
  srcSet
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Generate WebP variant path
  const webpSrc = src?.replace(/\.(jpg|png)$/, '.webp');

  if (error) {
    return (
      <div className={`${className} bg-gray-800 flex items-center justify-center`}>
        <span className="text-gray-500 text-sm">Image failed to load</span>
      </div>
    );
  }

  return (
    <picture>
      {webpSrc && (
        <source 
          srcSet={webpSrc} 
          type="image/webp"
        />
      )}
      <source 
        srcSet={srcSet || src} 
        type="image/jpeg"
      />
      <img
        src={src}
        alt={alt}
        className={`${className} ${
          !isLoaded ? 'blur-sm' : 'blur-0'
        } transition-all duration-300`}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        width={width}
        height={height}
      />
    </picture>
  );
};

export default OptimizedImage;
