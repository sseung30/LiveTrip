'use client';
import Image from 'next/image';
import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  fallback: string;
  [key: string]: any;
}
export default function ImageWithFallback({
  src,
  fallback,
  alt,
  width,
  height,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      width={width}
      height={height}
      alt={alt}
      onError={() => {
        setImgSrc(fallback);
      }}
    />
  );
}
