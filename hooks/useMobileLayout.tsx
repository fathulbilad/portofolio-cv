"use client";

import { useEffect, useState } from "react";

export default function useMobileLayout() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const check = () => setIsMobile(mediaQuery.matches);

    check();
    mediaQuery.addEventListener("change", check);

    return () => {
      mediaQuery.removeEventListener("change", check);
    };
  }, []);

  return isMobile;
}
