"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ThemeToggle } from "./components/theme-toggle"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([])
  const menuBackgroundRef = useRef<HTMLDivElement>(null)
  const topLineRef = useRef<HTMLSpanElement>(null)
  const middleLineRef = useRef<HTMLSpanElement>(null)
  const bottomLineRef = useRef<HTMLSpanElement>(null)
  const pathname = usePathname()

  // Initialize menu items refs
  useEffect(() => {
    menuItemsRef.current = menuItemsRef.current.slice(0, 4) // 4 menu items
  }, [])

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

  // Handle menu animations
  useEffect(() => {
    if (!menuRef.current) return

    const tl = gsap.timeline({ paused: true })

    // Animate the burger icon to X
    tl.to(
      topLineRef.current,
      {
        rotation: 45,
        y: 8,
        duration: 0.3,
        ease: "power2.inOut",
      },
      0,
    )

    tl.to(
      middleLineRef.current,
      {
        opacity: 0,
        x: -10,
        duration: 0.3,
        ease: "power2.inOut",
      },
      0,
    )

    tl.to(
      bottomLineRef.current,
      {
        rotation: -45,
        y: -8,
        duration: 0.3,
        ease: "power2.inOut",
      },
      0,
    )

    // Animate the menu background
    tl.fromTo(
      menuBackgroundRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" },
      0.1,
    )

    // Animate menu items with stagger
    tl.fromTo(
      menuItemsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.4, ease: "power2.out" },
      0.2,
    )

    // Play or reverse the animation based on menu state
    if (isMobileMenuOpen) {
      tl.play()
    } else {
      tl.reverse()
    }

    return () => {
      tl.kill()
    }
  }, [isMobileMenuOpen])

  // Handle smooth scrolling to sections on home page
  const scrollToSection = (sectionIndex: number) => {
    setIsMobileMenuOpen(false)

    // If we're on the home page, scroll to the section
    if (window.location.pathname === "/") {
      const sections = document.querySelectorAll(".scroll-section")
      if (sections[sectionIndex]) {
        sections[sectionIndex].scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const addToMenuItemsRef = (el: HTMLAnchorElement | null, index: number) => {
    if (menuItemsRef.current) {
      menuItemsRef.current[index] = el
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
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
          ref={menuButtonRef}
          className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span
            ref={topLineRef}
            className="w-8 h-0.5 bg-gray-900 dark:bg-white rounded-full transform transition-all duration-300 origin-center"
          ></span>
          <span
            ref={middleLineRef}
            className="w-8 h-0.5 bg-gray-900 dark:bg-white rounded-full transform transition-all duration-300 origin-center mt-2"
          ></span>
          <span
            ref={bottomLineRef}
            className="w-8 h-0.5 bg-gray-900 dark:bg-white rounded-full transform transition-all duration-300 origin-center mt-2"
          ></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        ref={menuRef}
        className={`md:hidden fixed inset-0 z-40 ${isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          ref={menuBackgroundRef}
          className="absolute inset-0 bg-gradient-to-b from-white/95 to-purple-100/95 dark:from-black/95 dark:to-purple-900/95 backdrop-blur-lg"
        ></div>

        <div className="relative h-full flex flex-col justify-center items-center p-8">
          <nav className="flex flex-col items-center space-y-6">
            <Link
              href="/"
              ref={(el) => addToMenuItemsRef(el, 0)}
              className={`text-2xl font-medium text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors ${
                pathname === "/" ? "text-purple-600 dark:text-purple-400" : ""
              }`}
              onClick={() => scrollToSection(0)}
            >
              Home
            </Link>
            <Link
              href="/about"
              ref={(el) => addToMenuItemsRef(el, 1)}
              className={`text-2xl font-medium text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors ${
                pathname === "/about" ? "text-purple-600 dark:text-purple-400" : ""
              }`}
              onClick={() => scrollToSection(1)}
            >
              About
            </Link>
            <Link
              href="/gigs"
              ref={(el) => addToMenuItemsRef(el, 2)}
              className={`text-2xl font-medium text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors ${
                pathname === "/gigs" ? "text-purple-600 dark:text-purple-400" : ""
              }`}
              onClick={() => scrollToSection(2)}
            >
              Gigs
            </Link>
            <Link
              href="/contact"
              ref={(el) => addToMenuItemsRef(el, 3)}
              className={`text-2xl font-medium text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors ${
                pathname === "/contact" ? "text-purple-600 dark:text-purple-400" : ""
              }`}
              onClick={() => scrollToSection(3)}
            >
              Contact
            </Link>
            <div className="mt-4">
              <ThemeToggle />
            </div>
          </nav>

          {/* Social media icons or additional links could go here */}
          <div className="mt-12 flex space-x-6">
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-gray-200/50 dark:bg-white/10 flex items-center justify-center hover:bg-purple-200/50 dark:hover:bg-purple-500/30 transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-700 dark:text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-gray-200/50 dark:bg-white/10 flex items-center justify-center hover:bg-purple-200/50 dark:hover:bg-purple-500/30 transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-700 dark:text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-gray-200/50 dark:bg-white/10 flex items-center justify-center hover:bg-purple-200/50 dark:hover:bg-purple-500/30 transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-700 dark:text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

