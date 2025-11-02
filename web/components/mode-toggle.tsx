"use client"

import { Search, User, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="flex items-center gap-4">
      <button
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>

      <button
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Account"
      >
        <User className="h-5 w-5" />
      </button>

      <div className="relative" ref={dropdownRef}>
        <button
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle theme"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <Sun className="h-5 w-5" />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-950 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 z-50">
            <div className="py-2 px-3">
              <button
                className={cn(
                  "w-full text-left py-2 px-3 rounded-md text-lg",
                  theme === "light" ? "bg-gray-100 dark:bg-gray-800" : "",
                )}
                onClick={() => {
                  setTheme("light")
                  setIsOpen(false)
                }}
              >
                Light
              </button>

              <button
                className={cn(
                  "w-full text-left py-2 px-3 rounded-md text-lg text-green-800",
                  theme === "dark" ? "bg-green-50" : "",
                )}
                onClick={() => {
                  setTheme("dark")
                  setIsOpen(false)
                }}
              >
                Dark
              </button>

              <button
                className={cn(
                  "w-full text-left py-2 px-3 rounded-md text-lg",
                  theme === "system" ? "bg-gray-100 dark:bg-gray-800" : "",
                )}
                onClick={() => {
                  setTheme("system")
                  setIsOpen(false)
                }}
              >
                System
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
