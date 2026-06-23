"use client";

import { useRef } from "react";
import { useSiteMotion, type MotionLevel } from "@/hooks/use-site-motion";

/**
 * Client wrapper that hosts the whole page inside a [data-root] element and
 * runs the scroll/pointer motion engine against it. Sections passed as
 * children stay server-rendered; the engine only mutates the DOM.
 */
export function SiteMotion({
  motion = "Massima",
  children,
}: {
  motion?: MotionLevel;
  children: React.ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  useSiteMotion(rootRef, motion);

  return (
    <div
      ref={rootRef}
      data-root
      className="relative w-full overflow-hidden"
    >
      {children}
    </div>
  );
}
