// components/timer.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { Clock } from "lucide-react";

interface TimerProps {
  duration: number; // in seconds
  onExpire: () => void;
  onTimeUpdate?: (timeSpent: number) => void;
  stopped?: boolean;
}

export function Timer({
  duration,
  onExpire,
  onTimeUpdate,
  stopped = false,
}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const isRunningRef = useRef(true);
  const hasExpiredRef = useRef(false);
  const startTimeRef = useRef(Date.now());
  const onTimeUpdateRef = useRef(onTimeUpdate);
  const onExpireRef = useRef(onExpire);
  const stoppedRef = useRef(stopped);

  // Update refs when props change - this avoids stale closures
  useEffect(() => {
    onTimeUpdateRef.current = onTimeUpdate;
    onExpireRef.current = onExpire;
    stoppedRef.current = stopped;

    // Handle stopping the timer when props change
    if (stopped && isRunningRef.current) {
      isRunningRef.current = false;

      // Use setTimeout to ensure this doesn't happen during render
      setTimeout(() => {
        // Calculate time spent accurately
        const elapsedMs = Date.now() - startTimeRef.current;
        const timeSpentSeconds = Math.min(
          Math.round(elapsedMs / 1000),
          duration,
        );

        // Report time spent to parent component safely using the ref
        if (onTimeUpdateRef.current) {
          onTimeUpdateRef.current(timeSpentSeconds);
        }
      }, 0);
    }
  }, [stopped, duration, onTimeUpdate, onExpire]);

  // Main timer effect - only runs once on mount
  useEffect(() => {
    let timerInterval: NodeJS.Timeout | null = null;
    let mounted = true;

    // Start the timer
    const startTimer = () => {
      // Clear any existing interval
      if (timerInterval) {
        clearInterval(timerInterval);
      }

      // Create a new interval that updates timeLeft
      timerInterval = setInterval(() => {
        if (!mounted || stoppedRef.current || !isRunningRef.current) {
          return;
        }

        // Update remaining time based on elapsed time since start
        const elapsedSeconds = Math.floor(
          (Date.now() - startTimeRef.current) / 1000,
        );
        const newTimeLeft = Math.max(0, duration - elapsedSeconds);

        // Update the displayed time
        setTimeLeft(newTimeLeft);

        // Check if timer has expired
        if (newTimeLeft === 0 && !hasExpiredRef.current) {
          hasExpiredRef.current = true;
          isRunningRef.current = false;

          // Clear the interval
          if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
          }

          // Notify parent of expiration - use setTimeout to avoid render-phase updates
          setTimeout(() => {
            if (onTimeUpdateRef.current) {
              onTimeUpdateRef.current(duration);
            }
            if (onExpireRef.current) {
              onExpireRef.current();
            }
          }, 0);
        }
      }, 1000);
    };

    // Initialize the timer
    startTimer();

    // Cleanup on unmount
    return () => {
      mounted = false;
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [duration]); // Only depend on duration to avoid re-creating the interval

  // Reset state when the key changes (new question)
  useEffect(() => {
    hasExpiredRef.current = false;
    isRunningRef.current = true;
    startTimeRef.current = Date.now();
    setTimeLeft(duration);

    return () => {
      hasExpiredRef.current = false;
    };
  }, [duration]); // This effect runs when the key changes via the duration prop changing

  // Format time as MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  // Determine color based on time left
  const getColorClass = () => {
    if (timeLeft <= duration * 0.25) return "text-red-500";
    if (timeLeft <= duration * 0.5) return "text-amber-500";
    return "text-green-500";
  };

  return (
    <div className="flex items-center gap-1.5">
      <Clock className={`h-4 w-4 ${getColorClass()}`} />
      <span className={`font-medium ${getColorClass()}`}>{formattedTime}</span>
    </div>
  );
}
