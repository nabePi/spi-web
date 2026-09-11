"use client";

import { closeSideInfo } from "@/lib/template/sideInfo";

const OffcanvasOverlay = () => (
  <div className="offcanvas-overlay" onClick={closeSideInfo} />
);

export default OffcanvasOverlay;
