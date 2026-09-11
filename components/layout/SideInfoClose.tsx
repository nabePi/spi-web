"use client";

import type { ReactNode } from "react";
import { closeSideInfo } from "@/lib/template/sideInfo";

type SideInfoCloseProps = {
  className?: string;
  id?: string;
  children: ReactNode;
};

const SideInfoClose = ({ className, id, children }: SideInfoCloseProps) => (
  <button
    type="button"
    id={id}
    className={className}
    aria-label="Close menu"
    onClick={closeSideInfo}
  >
    {children}
  </button>
);

export default SideInfoClose;
