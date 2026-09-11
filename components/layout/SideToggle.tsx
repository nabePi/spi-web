"use client";

import type { ReactNode } from "react";
import { openSideInfo } from "@/lib/template/sideInfo";

const SideToggle = ({ children }: { children: ReactNode }) => (
  <button type="button" className="side-toggle" aria-label="Open menu" onClick={openSideInfo}>
    {children}
  </button>
);

export default SideToggle;
