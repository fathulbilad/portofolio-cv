"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  createMotionProfile,
  type MotionProfile,
  type MotionSignals,
} from "@/lib/motion-profile";

type NavigatorWithDeviceHints = Navigator & {
  deviceMemory?: number;
  connection?: {
    saveData?: boolean;
    addEventListener?: (type: "change", listener: () => void) => void;
    removeEventListener?: (type: "change", listener: () => void) => void;
  };
};

const DEFAULT_SIGNALS: MotionSignals = {
  prefersReducedMotion: false,
  isMobile: false,
  hardwareConcurrency: 4,
  saveData: false,
};

type MotionContextValue = MotionProfile & {
  resolved: boolean;
};

const MotionContext = createContext<MotionContextValue | null>(null);

function readMotionSignals(): MotionSignals {
  const browserNavigator = navigator as NavigatorWithDeviceHints;

  return {
    prefersReducedMotion: window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches,
    isMobile: window.matchMedia("(max-width: 768px)").matches,
    hardwareConcurrency: browserNavigator.hardwareConcurrency,
    deviceMemory: browserNavigator.deviceMemory,
    saveData: browserNavigator.connection?.saveData === true,
  };
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [signals, setSignals] = useState<MotionSignals | null>(null);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const connection = (navigator as NavigatorWithDeviceHints).connection;
    const update = () => setSignals(readMotionSignals());

    update();
    reducedMotionQuery.addEventListener("change", update);
    mobileQuery.addEventListener("change", update);
    connection?.addEventListener?.("change", update);

    return () => {
      reducedMotionQuery.removeEventListener("change", update);
      mobileQuery.removeEventListener("change", update);
      connection?.removeEventListener?.("change", update);
    };
  }, []);

  const profile = useMemo<MotionContextValue>(
    () => ({
      ...createMotionProfile(signals ?? DEFAULT_SIGNALS),
      resolved: signals !== null,
    }),
    [signals],
  );

  useEffect(() => {
    document.documentElement.dataset.motion = profile.resolved
      ? profile.level
      : "pending";
  }, [profile.level, profile.resolved]);

  return (
    <MotionContext.Provider value={profile}>{children}</MotionContext.Provider>
  );
}

export function useMotionProfile() {
  const profile = useContext(MotionContext);
  if (!profile) {
    throw new Error("useMotionProfile must be used within MotionProvider");
  }
  return profile;
}
