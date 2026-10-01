import type { CSSProperties } from "react";
import { ProductAsset } from "@/components/ui/product-asset";

type Box = { x: number; y: number; w: number; h: number };

/**
 * Measured alpha-channel bounding box of the bottle inside each approved
 * canvas size (fractions of the canvas). The box only decides how much of the
 * transparent canvas padding may overlap neighbouring elements — the image is
 * never clipped, scaled non-uniformly or altered: `overflow` stays visible and
 * the full canvas is rendered at its native aspect ratio.
 */
const canvasBoxes: Record<string, Box> = {
  "1680x2100": { x: 616 / 1680, y: 172 / 2100, w: 450 / 1680, h: 1666 / 2100 },
  "640x800": { x: 235 / 640, y: 65 / 800, w: 171 / 640, h: 641 / 800 },
  "182x870": { x: 6 / 182, y: 111 / 870, w: 176 / 182, h: 646 / 870 },
  "91x435": { x: 3 / 91, y: 54 / 435, w: 88 / 91, h: 325 / 435 },
};

/** Per-file overrides where one asset sits differently inside its canvas. */
const assetBoxes: Record<string, Box> = {
  "/assets/products/mister-bee/mister-bee-catalog-cranberry-front.png": {
    x: 3 / 91,
    y: 60 / 435,
    w: 88 / 91,
    h: 324 / 435,
  },
  // 0,75 л bottles are taller inside the same 1680×2100 canvas.
  "/assets/products/double-tree/double-tree-075-yellow-pear-front.png":
    box075(),
  "/assets/products/double-tree/double-tree-075-dark-cherry-front.png":
    box075(),
  "/assets/products/double-tree/double-tree-075-green-apple-front.png":
    box075(),
  "/assets/products/double-tree/double-tree-075-red-apple-front.png": box075(),
  "/assets/products/double-tree/double-tree-075-pomegranate-raspberry-front.png":
    box075(),
};

function box075(): Box {
  return { x: 578 / 1680, y: 86 / 2100, w: 514 / 1680, h: 1799 / 2100 };
}

export type BottleAsset = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

type BottleProps = {
  asset: BottleAsset;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Stagger index exposed to CSS as `--i`. */
  index?: number;
};

/**
 * A bottle sized by its real glass silhouette: set the height with the
 * `--bottle-h` custom property (or a `height` rule on the class) and the
 * width follows the packaging's true proportions.
 */
export function Bottle({
  asset,
  className = "",
  sizes = "(max-width: 768px) 60vw, 30vw",
  priority = false,
  index = 0,
}: BottleProps) {
  const box = assetBoxes[asset.src] ??
    canvasBoxes[`${asset.width}x${asset.height}`] ?? { x: 0, y: 0, w: 1, h: 1 };
  const style = {
    "--i": index,
    "--bx": box.x / box.w,
    "--by": box.y / box.h,
    "--bw": 1 / box.w,
    "--bh": 1 / box.h,
    aspectRatio: `${box.w * asset.width} / ${box.h * asset.height}`,
  } as CSSProperties;

  return (
    <span className={`cx-bottle ${className}`.trim()} style={style}>
      <span className="cx-bottle__lift">
        <ProductAsset
          alt={asset.alt}
          className="cx-bottle__asset"
          height={asset.height}
          priority={priority}
          sizes={sizes}
          src={asset.src}
          width={asset.width}
        />
      </span>
    </span>
  );
}
