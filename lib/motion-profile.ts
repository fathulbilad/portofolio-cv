export type MotionLevel = "full" | "balanced" | "reduced";

export type MotionSignals = {
  prefersReducedMotion: boolean;
  isMobile: boolean;
  hardwareConcurrency?: number;
  deviceMemory?: number;
  saveData: boolean;
};

export type MotionProfile = {
  level: MotionLevel;
  isMobile: boolean;
  smoothScroll: boolean;
  ambientMotion: boolean;
  parallax: boolean;
  autoplayVideo: boolean;
  backdropBlur: boolean;
  starfield: {
    animated: boolean;
    count: number;
    dpr: number;
    fps: number;
    streaks: boolean;
  };
  pipeline: {
    enabled: boolean;
    particles: number;
    fps: number;
  };
};

const PROFILES: Record<MotionLevel, Omit<MotionProfile, "level" | "isMobile">> =
  {
    full: {
      smoothScroll: true,
      ambientMotion: true,
      parallax: true,
      autoplayVideo: true,
      backdropBlur: true,
      starfield: {
        animated: true,
        count: 260,
        dpr: 1.5,
        fps: 60,
        streaks: true,
      },
      pipeline: {
        enabled: true,
        particles: 90,
        fps: 60,
      },
    },
    balanced: {
      smoothScroll: false,
      ambientMotion: false,
      parallax: false,
      autoplayVideo: true,
      backdropBlur: false,
      starfield: {
        animated: true,
        count: 120,
        dpr: 1,
        fps: 30,
        streaks: false,
      },
      pipeline: {
        enabled: true,
        particles: 45,
        fps: 30,
      },
    },
    reduced: {
      smoothScroll: false,
      ambientMotion: false,
      parallax: false,
      autoplayVideo: false,
      backdropBlur: false,
      starfield: {
        animated: false,
        count: 80,
        dpr: 1,
        fps: 1,
        streaks: false,
      },
      pipeline: {
        enabled: false,
        particles: 0,
        fps: 1,
      },
    },
  };

export function selectMotionLevel(signals: MotionSignals): MotionLevel {
  if (signals.prefersReducedMotion || signals.saveData) return "reduced";

  const constrainedCpu =
    signals.hardwareConcurrency !== undefined &&
    signals.hardwareConcurrency <= 4;
  const constrainedMemory =
    signals.deviceMemory !== undefined && signals.deviceMemory <= 4;

  if (signals.isMobile || constrainedCpu || constrainedMemory) {
    return "balanced";
  }

  return "full";
}

export function createMotionProfile(signals: MotionSignals): MotionProfile {
  const level = selectMotionLevel(signals);

  return {
    level,
    isMobile: signals.isMobile,
    ...PROFILES[level],
  };
}
