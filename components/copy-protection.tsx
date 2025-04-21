"use client"

import { useEffect, useRef } from "react"
import { toast } from "sonner"
import Link from "next/link"

export function CopyProtection() {
  const toastShownRef = useRef(false)
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const preventCopy = (e: Event) => {
      e.preventDefault()
      showCopyrightToast()
      return false
    }

    const preventSelection = (e: Event) => {
      e.preventDefault()
      showCopyrightToast()
      return false
    }

    const preventContextMenu = (e: Event) => {
      e.preventDefault()
      return false
    }

    const preventKeyboard = (e: KeyboardEvent) => {
      // Prevent Ctrl+C, Ctrl+A, etc.
      if (
        (e.ctrlKey || e.metaKey) && 
        (e.key === 'c' || e.key === 'a' || e.key === 'p' || e.key === 's')
      ) {
        e.preventDefault()
        showCopyrightToast()
        return false
      }
    }

    const showCopyrightToast = () => {
      // Only show toast if not already showing
      if (!toastShownRef.current) {
        toastShownRef.current = true
        
        toast.error(
          <div className="flex flex-col gap-1">
            <p className="font-medium">Content is protected by copyright</p>
            <p className="text-sm">
              Please respect our intellectual property. 
              <Link href="/copyright" className="ml-1 underline">
                View copyright notice
              </Link>
            </p>
          </div>
        )

        // Reset the flag after 3 seconds to allow showing the toast again
        if (toastTimeoutRef.current) {
          clearTimeout(toastTimeoutRef.current)
        }
        
        toastTimeoutRef.current = setTimeout(() => {
          toastShownRef.current = false
        }, 3000)
      }
    }

    // Add CSS to prevent selection
    const style = document.createElement("style")
    style.innerHTML = `
      .copy-protected {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      .copy-protected img {
        pointer-events: none;
        -webkit-user-drag: none;
      }
    `
    document.head.appendChild(style)

    // Find and add the protection class to all question cards
    const questionCards = document.querySelectorAll(".card")
    questionCards.forEach(card => {
      card.classList.add("copy-protected")
    })

    // Add event listeners
    document.addEventListener("copy", preventCopy, true)
    document.addEventListener("cut", preventCopy, true)
    document.addEventListener("selectstart", preventSelection, true)
    document.addEventListener("contextmenu", preventContextMenu, true)
    document.addEventListener("keydown", preventKeyboard, true)
    
    // Disable drag and drop
    document.addEventListener("dragstart", preventCopy, true)

    return () => {
      // Cleanup event listeners on unmount
      document.removeEventListener("copy", preventCopy, true)
      document.removeEventListener("cut", preventCopy, true)
      document.removeEventListener("selectstart", preventSelection, true)
      document.removeEventListener("contextmenu", preventContextMenu, true)
      document.removeEventListener("keydown", preventKeyboard, true)
      document.removeEventListener("dragstart", preventCopy, true)
      document.head.removeChild(style)
      
      // Clear timeout to prevent memory leaks
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current)
      }
    }
  }, [])

  return null // This component doesn't render anything
}