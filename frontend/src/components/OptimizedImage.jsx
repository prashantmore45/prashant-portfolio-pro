import { useState } from 'react';

// Every raster file in /public/images has a generated .webp sibling. Anything
// else — remote URLs, base64 uploads from the dashboard — is passed through
// untouched, because a <source> that 404s does NOT fall back to the <img>.
const LOCAL_RASTER = /^\/images\/.+\.(png|jpe?g)$/i;

const OptimizedImage = ({
  src,
  alt = '',
  className = '',
  width,
  height,
  priority = false
}) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`${className} bg-white/5 flex items-center justify-center`}>
        <span className="text-gray-600 text-xs">Image unavailable</span>
      </div>
    );
  }

  // srcSet treats whitespace as a descriptor separator, and at least one file is
  // named "amazon clone.png", so the URL has to be encoded here.
  const webpSrc = LOCAL_RASTER.test(src)
    ? encodeURI(src.replace(/\.(png|jpe?g)$/i, '.webp'))
    : null;

  const img = (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );

  if (!webpSrc) return img;

  // display:contents keeps <picture> out of the layout, so utility classes like
  // h-full on the <img> still resolve against the original parent.
  return (
    <picture className="contents">
      <source srcSet={webpSrc} type="image/webp" />
      {img}
    </picture>
  );
};

export default OptimizedImage;
