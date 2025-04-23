// components/timer.tsx
/* eslint-disable react-hooks/exhaustive-deps */
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
  const remainingTimeOnPauseRef = useRef<number | null>(null); // Store exact remaining ms when paused to prevent race conditions

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
    // Update duration ref when prop changes
    durationRef.current = duration;

    // If timer is running, we need to recalculate end time based on new duration
    if (
      startTimeRef.current &&
      !pauseTimeRef.current &&
      !hasExpiredRef.current
    ) {
      const elapsedMs = performance.now() - startTimeRef.current;
      const newEndTime = performance.now() + duration * 1000 - elapsedMs;

      // Only adjust if the new end time is in the future and reasonable
      if (newEndTime > performance.now()) {
        endTimeRef.current = newEndTime;
      }
    }

    // If paused, update the stored remaining time to reflect new duration
    if (pauseTimeRef.current && remainingTimeOnPauseRef.current !== null) {
      // Calculate what percentage through the old duration we were
      const oldDuration = endTimeRef.current
        ? (endTimeRef.current -
            startTimeRef.current! +
            (performance.now() - pauseTimeRef.current)) /
          1000
        : 0;

      if (oldDuration > 0) {
        const percentComplete =
          1 - remainingTimeOnPauseRef.current / 1000 / oldDuration;
        // Apply that percentage to the new duration
        remainingTimeOnPauseRef.current =
          (1 - percentComplete) * duration * 1000;
      } else {
        // If we can't calculate percentages, just use the new full duration
        remainingTimeOnPauseRef.current = duration * 1000;
      }
    }

    // Always update callback refs
    onExpireRef.current = onExpire;
    onTimeUpdateRef.current = onTimeUpdate;
  }, [duration, onExpire, onTimeUpdate]);

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
    remainingTimeOnPauseRef.current = null;
    lastUpdatedSecondRef.current = -1; // Ensure first update triggers
    setTimeLeft(durationRef.current); // Set initial display time based on current duration

    if (!stopped) {
      // --- Start Timer ---
      startTimeRef.current = performance.now();
      endTimeRef.current = startTimeRef.current + durationRef.current * 1000;
      animationFrameRef.current = requestAnimationFrame(tick);
    } else {
      // --- Initialize as Stopped ---
      // Set placeholder start/end times but don't start the loop
      startTimeRef.current = performance.now();
      endTimeRef.current = startTimeRef.current + durationRef.current * 1000;
      pauseTimeRef.current = startTimeRef.current;
      remainingTimeOnPauseRef.current = durationRef.current * 1000; // Store exact remaining time
    }

    // Cleanup function for unmount or duration change
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
    // This effect runs when the component mounts and ONLY when `duration` or `stopped` initial value changes
  }, [duration, stopped]); // Depend on duration and initial stopped state

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
      if (!pauseTimeRef.current && endTimeRef.current) {
        pauseTimeRef.current = performance.now();
        // Store exact remaining time to prevent race conditions with duration changes
        remainingTimeOnPauseRef.current = Math.max(
          0,
          endTimeRef.current - performance.now(),
        );
      }
    } else if (wasStopped && !shouldBeStopped) {
      // --- RESUME ---
      if (pauseTimeRef.current && remainingTimeOnPauseRef.current !== null) {
        // Use stored remaining time instead of calculating with duration to avoid race conditions
        endTimeRef.current =
          performance.now() + remainingTimeOnPauseRef.current;
      } else if (!startTimeRef.current || !endTimeRef.current) {
        // Handle edge case: resuming when it was stopped before ever truly starting
        startTimeRef.current = performance.now();
        endTimeRef.current = startTimeRef.current + durationRef.current * 1000;
      }

      pauseTimeRef.current = null; // Clear pause time
      remainingTimeOnPauseRef.current = null; // Clear stored remaining time

      // Restart the animation loop if it's not already running (safety check)
      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(tick);
      }
    }
  }, [stopped]); // This effect ONLY reacts to changes in the `stopped` prop

  // --- Core Timer Logic (requestAnimationFrame callback) ---
  const tick = useCallback(() => {
    // Ensure timer should be running before proceeding
    if (
      isExternallyStoppedRef.current ||
      hasExpiredRef.current ||
      !endTimeRef.current
    ) {
      // Should not happen if pause/resume logic is correct, but provides safety
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const now = performance.now();
    const remainingMs = Math.max(0, endTimeRef.current - now);
    const newTimeLeftSeconds = Math.floor(remainingMs / 1000);

    // --- Optimization: Only update state if the displayed second changes ---
    if (newTimeLeftSeconds !== timeLeft) {
      setTimeLeft(newTimeLeftSeconds);
    }

    // --- Calculate time spent consistently with displayed time ---
    // Use the same floor method for consistency with displayed time
    const timeSpentSeconds = Math.min(
      durationRef.current,
      durationRef.current - newTimeLeftSeconds,
    );

    // --- Call onTimeUpdate (throttled to once per second change) ---
    if (
      onTimeUpdateRef.current &&
      lastUpdatedSecondRef.current !== timeSpentSeconds &&
      !hasExpiredRef.current // Don't update if already expired this tick
    ) {
      lastUpdatedSecondRef.current = timeSpentSeconds;
      onTimeUpdateRef.current(timeSpentSeconds);
    }

    // --- Check for Expiration ---
    if (remainingMs <= 0) {
      hasExpiredRef.current = true;

      // Final callback - no need to update state again as we're using timeLeft for rendering
      if (
        onTimeUpdateRef.current &&
        lastUpdatedSecondRef.current !== durationRef.current
      ) {
        onTimeUpdateRef.current(durationRef.current);
      }

      // Call expiration callback
      onExpireRef.current();

      // Stop the animation loop
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    } else {
      // --- Continue the Loop ---
      // Schedule the next frame only if it hasn't been stopped externally in the meantime
      if (!isExternallyStoppedRef.current) {
        animationFrameRef.current = requestAnimationFrame(tick);
      } else {
        // If stopped externally, ensure frame is cancelled
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      }
    }
  }, [timeLeft]); // Only depend on timeLeft for efficient conditional updates

  // --- Formatting & Rendering ---
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  const getColorClass = () => {
    if (timeLeft <= 0) return "text-gray-500"; // Indicate expired/done
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
