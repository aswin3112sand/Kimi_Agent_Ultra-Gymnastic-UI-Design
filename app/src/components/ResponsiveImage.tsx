import type { CSSProperties } from 'react';

type ResponsiveImageProps = {
  name: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
  sizes?: string;
  style?: CSSProperties;
};

const baseUrl = import.meta.env.BASE_URL;

const buildSrc = (name: string, extension: string) => `${baseUrl}${name}.${extension}`;

export function ResponsiveImage({
  name,
  alt,
  className,
  imgClassName,
  loading,
  fetchPriority,
  sizes,
  style
}: ResponsiveImageProps) {
  return (
    <picture className={className}>
      <source srcSet={buildSrc(name, 'avif')} type="image/avif" sizes={sizes} />
      <source srcSet={buildSrc(name, 'webp')} type="image/webp" sizes={sizes} />
      <img
        src={buildSrc(name, 'jpg')}
        alt={alt}
        className={imgClassName}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        sizes={sizes}
        style={style}
      />
    </picture>
  );
}
