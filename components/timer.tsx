"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

interface TimerProps {
  duration: number // in seconds
  onExpire: () => void
  stopped?: boolean // New prop to stop the timer when an answer is selected
}

export function Timer({ duration, onExpire, stopped = false }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [isRunning, setIsRunning] = useState(true)

  // Effect to handle the stopped prop
  useEffect(() => {
    if (stopped) {
      setIsRunning(false)
    }
  }, [stopped])

  useEffect(() => {
    if (!isRunning) return

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          setIsRunning(false)
          onExpire()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isRunning, onExpire])

  // Format time as MM:SS
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

  // Determine color based on time left
  const getColorClass = () => {
    if (timeLeft <= duration * 0.25) return "text-red-500"
    if (timeLeft <= duration * 0.5) return "text-amber-500"
    return "text-green-500"
  }

  return (
    <div className="flex items-center gap-1.5">
      <Clock className={`h-4 w-4 ${getColorClass()}`} />
      <span className={`font-medium ${getColorClass()}`}>{formattedTime}</span>
    </div>
  )
}
