"use client";

import Image from "next/image";
import { useState } from "react";

type ProductAssetProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

export function ProductAsset({
  src,
  alt,
  width,
  height,
  sizes = "(max-width: 767px) 44vw, 260px",
  priority = false,
  className = "",
}: ProductAssetProps) {
  const [failed, setFailed] = useState(false);

  return (
    <figure
      className={`product-asset ${failed ? "product-asset--error" : ""} ${className}`.trim()}
    >
      {failed ? (
        <div className="product-asset__fallback" role="status">
          Approved product asset is unavailable.
        </div>
      ) : (
        <Image
          alt={alt}
          className="product-asset__image"
          draggable={false}
          height={height}
          onError={() => setFailed(true)}
          priority={priority}
          sizes={sizes}
          src={src}
          width={width}
        />
      )}
    </figure>
  );
}
