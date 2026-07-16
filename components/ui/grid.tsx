import type { ComponentPropsWithoutRef } from "react";

type GridProps = ComponentPropsWithoutRef<"div"> & {
  columns?: 1 | 2 | 3 | 4 | 12;
};

export function Grid({ className = "", columns = 12, ...props }: GridProps) {
  return (
    <div className={`grid grid--${columns} ${className}`.trim()} {...props} />
  );
}
