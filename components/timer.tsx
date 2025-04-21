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
  const [isRunning, setIsRunning] = useState(true);
  const hasExpired = useRef(false);
  const startTimeRef = useRef(Date.now());

  // Handle stopping the timer and reporting time
  useEffect(() => {
    if (stopped && isRunning) {
      setIsRunning(false);

      // Calculate time spent accurately based on actual elapsed time
      const elapsedMs = Date.now() - startTimeRef.current;
      const timeSpentSeconds = Math.min(Math.round(elapsedMs / 1000), duration);

      // Report time spent to parent component
      if (onTimeUpdate) {
        onTimeUpdate(timeSpentSeconds);
      }
    }
  }, [stopped, duration, onTimeUpdate, isRunning]);

  // Timer countdown effect
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsRunning(false);

          // When expired, report the full duration
          if (onTimeUpdate) {
            onTimeUpdate(duration);
          }
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, duration, onTimeUpdate]);

  // Handle timer expiration
  useEffect(() => {
    if (timeLeft === 0 && !hasExpired.current && !stopped) {
      hasExpired.current = true;
      onExpire();
    }
  }, [timeLeft, onExpire, stopped]);

  // Reset state on component mount/key change
  useEffect(() => {
    hasExpired.current = false;
    startTimeRef.current = Date.now();
    setTimeLeft(duration);
    setIsRunning(true);

    return () => {
      hasExpired.current = false;
    };
  }, [duration]);

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
