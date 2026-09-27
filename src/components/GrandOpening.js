"use client";

import { memo } from "react";

function GrandOpening({ children }) {
  return (
    <div className="relative w-full z-0">
      {children}
    </div>
  );
}

export default memo(GrandOpening);
