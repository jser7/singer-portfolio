"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"
        >
          Jessie Hope
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          <Link
            href="/"
            className={`text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors ${pathname === "/" ? "font-semibold" : ""}`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors ${pathname === "/about" ? "font-semibold" : ""}`}
          >
            About
          </Link>
          <Link
            href="/gigs"
            className={`text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors ${pathname === "/gigs" ? "font-semibold" : ""}`}
          >
            Gigs
          </Link>
          <Link
            href="/contact"
            className={`text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors ${pathname === "/contact" ? "font-semibold" : ""}`}
          >
            Contact
          </Link>
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-8 h-0.5 bg-gray-900 dark:bg-white rounded-full transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-[0.3rem]" : ""
            }`}
          />
          <span
            className={`w-8 h-0.5 bg-gray-900 dark:bg-white rounded-full transition-all duration-300 mt-2 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-8 h-0.5 bg-gray-900 dark:bg-white rounded-full transition-all duration-300 mt-2 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-[0.7rem]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="absolute inset-0 bg-white dark:bg-black" />
        <div className="relative h-full pt-24 pb-6 px-4 flex flex-col">
          <nav className="flex-1 flex flex-col space-y-2">
            <Link
              href="/"
              className={`text-lg py-4 px-4 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                pathname === "/" ? "bg-gray-100 dark:bg-gray-800 font-semibold" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`text-lg py-4 px-4 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                pathname === "/about" ? "bg-gray-100 dark:bg-gray-800 font-semibold" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/gigs"
              className={`text-lg py-4 px-4 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                pathname === "/gigs" ? "bg-gray-100 dark:bg-gray-800 font-semibold" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Gigs
            </Link>
            <Link
              href="/contact"
              className={`text-lg py-4 px-4 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                pathname === "/contact" ? "bg-gray-100 dark:bg-gray-800 font-semibold" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
          <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

