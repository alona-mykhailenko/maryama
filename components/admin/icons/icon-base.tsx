import type { ReactNode } from 'react';

export interface IconProps {
  size?: number;
}

/**
 * Shared 24×24 line-icon frame (Lucide geometry). Strokes `currentColor` so the
 * parent controls the colour.
 */
export const IconBase = ({ size = 17, children }: IconProps & { children: ReactNode }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

export default IconBase;
