// components/timer.tsx
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Clock } from "lucide-react";

interface TimerProps {
  duration: number; // duration in seconds
  onExpire: () => void;
  onTimeUpdate?: (timeSpent: number) => void; // timeSpent in seconds
  stopped?: boolean; // External control to pause/resume
}

export function Timer({
  duration,
  onExpire,
  onTimeUpdate,
  stopped = false,
}: TimerProps) {
  // --- State ---
  // State for the displayed time (whole seconds remaining)
  const [timeLeft, setTimeLeft] = useState<number>(duration);

  // --- Refs for Stable Values & Internal State ---
  // Core Timer Mechanics
  const animationFrameRef = useRef<number | null>(null); // Stores the requestAnimationFrame ID
  const startTimeRef = useRef<number | null>(null); // Timestamp when the timer (re)started (performance.now())
  const endTimeRef = useRef<number | null>(null); // Calculated timestamp when the timer should end (performance.now())
  const pauseTimeRef = useRef<number | null>(null); // Timestamp when the timer was paused (performance.now())

  // Internal State Flags
  const hasExpiredRef = useRef<boolean>(false); // Flag to ensure onExpire only triggers once
  const isExternallyStoppedRef = useRef<boolean>(stopped); // Tracks the *prop* state

  // Stable Refs for Props/Callbacks (to avoid tick dependency)
  const durationRef = useRef<number>(duration);
  const onExpireRef = useRef<() => void>(onExpire);
  const onTimeUpdateRef = useRef<((timeSpent: number) => void) | undefined>(
    onTimeUpdate,
  );
  const lastUpdatedSecondRef = useRef<number>(-1); // Tracks the last *whole second* passed for onTimeUpdate throttling

  // --- Effects ---

  // Effect 1: Update stable refs when props change
  useEffect(() => {
    durationRef.current = duration;
    onExpireRef.current = onExpire;
    onTimeUpdateRef.current = onTimeUpdate;
  }, [duration, onExpire, onTimeUpdate]);

  // --- Core Timer Logic (requestAnimationFrame callback) ---
  // Define tick *before* the effects that use it
  const tick = useCallback(() => {
    // Ensure timer should be running before proceeding
    if (
      isExternallyStoppedRef.current ||
      hasExpiredRef.current ||
      !endTimeRef.current
    ) {
      // Safety check to ensure frame is cancelled if state is inconsistent
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const now = performance.now();
    const remainingMs = Math.max(0, endTimeRef.current - now);
    const newTimeLeftSeconds = Math.floor(remainingMs / 1000);

    // Optimization: Only update state if the displayed second changes
    setTimeLeft((currentTime) =>
      currentTime !== newTimeLeftSeconds ? newTimeLeftSeconds : currentTime,
    );

    // Calculate time spent (more robustly based on remaining time)
    // Use ceil on remainingMs converted to seconds before subtracting from duration
    // This ensures timeSpent increments as soon as a second has passed
    const timeSpentSeconds = Math.max(
      0,
      Math.min(
        durationRef.current,
        durationRef.current - Math.ceil(remainingMs / 1000),
      ),
    );

    // Call onTimeUpdate (throttled to once per second change)
    if (
      onTimeUpdateRef.current &&
      lastUpdatedSecondRef.current !== timeSpentSeconds &&
      !hasExpiredRef.current // Don't update if already expired this tick
    ) {
      lastUpdatedSecondRef.current = timeSpentSeconds;
      onTimeUpdateRef.current(timeSpentSeconds);
    }

    // Check for Expiration
    if (remainingMs <= 0) {
      if (!hasExpiredRef.current) {
        hasExpiredRef.current = true;
        setTimeLeft(0); // Ensure final display is exactly 0

        // Ensure final time update reflects full duration on expire
        if (
          onTimeUpdateRef.current &&
          lastUpdatedSecondRef.current !== durationRef.current
        ) {
          onTimeUpdateRef.current(durationRef.current);
        }
        // Call expiration callback
        onExpireRef.current();
      }
      // Stop the animation loop (already handled by checks at start, but safe)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    } else {
      // Continue the Loop
      // Schedule the next frame only if it hasn't been stopped externally in the meantime
      if (!isExternallyStoppedRef.current) {
        animationFrameRef.current = requestAnimationFrame(tick);
      } else {
        // Ensure frame is cancelled if stopped externally during this tick execution
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      }
    }
  }, []); // tick is stable due to empty dependency array and use of refs

  // Effect 2: Initialize timer, reset on duration change, handle initial stopped state
  useEffect(() => {
    // Always clear previous animation frame on reset
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    // Reset internal state flags and display
    hasExpiredRef.current = false;
    isExternallyStoppedRef.current = stopped;
    pauseTimeRef.current = null;
    lastUpdatedSecondRef.current = -1; // Ensure first update triggers
    setTimeLeft(durationRef.current); // Set initial display time based on current duration

    if (!stopped) {
      // --- Start Timer ---
      startTimeRef.current = performance.now();
      endTimeRef.current = startTimeRef.current + durationRef.current * 1000;
      animationFrameRef.current = requestAnimationFrame(tick); // Use tick
    } else {
      // --- Initialize as Stopped ---
      // Set placeholder start/end times but don't start the loop
      // Treat "now" as the pause time if initially stopped
      startTimeRef.current = performance.now();
      endTimeRef.current = startTimeRef.current + durationRef.current * 1000;
      pauseTimeRef.current = startTimeRef.current;
    }

    // Cleanup function for unmount or duration change
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
    // Add 'tick' to satisfy exhaustive-deps (safe because tick is stable)
  }, [duration, stopped, tick]);

  // Effect 3: Handle external pause/resume commands via the 'stopped' prop change
  useEffect(() => {
    const wasStopped = isExternallyStoppedRef.current;
    const shouldBeStopped = stopped;

    // Update the ref to the current prop value *after* comparison
    isExternallyStoppedRef.current = stopped;

    // Prevent handling if the timer has already naturally expired
    if (hasExpiredRef.current) {
      return;
    }

    if (!wasStopped && shouldBeStopped) {
      // --- PAUSE ---
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      // Record the time pause began only if it wasn't already paused
      if (!pauseTimeRef.current) {
        pauseTimeRef.current = performance.now();
      }
    } else if (wasStopped && !shouldBeStopped) {
      // --- RESUME ---
      if (pauseTimeRef.current && endTimeRef.current) {
        // Calculate how long it was paused
        const pausedDuration = performance.now() - pauseTimeRef.current;
        // Adjust the end time forward by the paused duration
        endTimeRef.current += pausedDuration;
      } else if (!startTimeRef.current || !endTimeRef.current) {
        // Handle edge case: resuming when it was stopped before ever truly starting
        startTimeRef.current = performance.now();
        endTimeRef.current = startTimeRef.current + durationRef.current * 1000;
      }

      pauseTimeRef.current = null; // Clear pause time

      // Restart the animation loop if it's not already running (safety check)
      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(tick); // Use tick
      }
    }
    // Add 'tick' to satisfy exhaustive-deps (safe because tick is stable)
  }, [stopped, tick]); // `duration` is accessed via ref, so not needed here

  // --- Formatting & Rendering ---
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  const getColorClass = () => {
    if (hasExpiredRef.current || timeLeft <= 0) return "text-gray-500"; // Indicate expired/done
    if (timeLeft <= durationRef.current * 0.25) return "text-red-500";
    if (timeLeft <= durationRef.current * 0.5) return "text-amber-500";
    return "text-green-500";
  };

  return (
    <div className="flex items-center gap-1.5">
      <Clock className={`h-4 w-4 ${getColorClass()}`} />
      {/* Use tabular-nums to prevent layout shifts when digits change */}
      <span className={`font-medium tabular-nums ${getColorClass()}`}>
        {formattedTime}
      </span>
    </div>
  );
}
