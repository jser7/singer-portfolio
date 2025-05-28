"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navbar from "../../components/navbar"
import { Mail, Phone, Instagram, Facebook, Twitter } from "lucide-react"

export default function ContactPage() {
  // Register ScrollTrigger plugin
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
  }, [])

  const pageRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  // Set up animations
  useEffect(() => {
    if (typeof window === "undefined" || !pageRef.current) return

    // Create a GSAP context for clean up
    const ctx = gsap.context(() => {
      // Create particles for background
      if (particlesRef.current) {
        const container = particlesRef.current
        const containerWidth = container.offsetWidth
        const containerHeight = container.offsetHeight

        // Remove any existing particles
        while (container.firstChild) {
          container.removeChild(container.firstChild)
        }

        // Add new particles
        for (let i = 0; i < 50; i++) {
          const particle = document.createElement("div")
          particle.className = "particle"

          // Random size between 4px and 12px
          const size = Math.random() * 8 + 4
          particle.style.width = `${size}px`
          particle.style.height = `${size}px`

          // Random position
          particle.style.left = `${Math.random() * containerWidth}px`
          particle.style.top = `${Math.random() * containerHeight}px`

          // Random color
          const colors = ["#EC4899", "#8B5CF6", "#3B82F6"]
          particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]

          container.appendChild(particle)
        }
      }

      // Page animations
      const tl = gsap.timeline()

      if (titleRef.current) {
        tl.fromTo(titleRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
      }

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6",
        )
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.children
        tl.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.4",
        )
      }
    })

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div ref={pageRef} className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden">
      <Navbar />

      {/* Particle background */}
      <div ref={particlesRef} className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-white dark:bg-black opacity-90" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/80 to-white dark:via-black/80 dark:to-black" />
      </div>

      {/* Contact section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-6 text-center leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500">
              Get in Touch
            </span>
          </h1>

          <p ref={subtitleRef} className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Have a question or want to book a performance? Feel free to reach out through any of these channels.
          </p>

          {/* Contact cards */}
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Email card */}
            <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl p-6 rounded-xl text-center transform-gpu hover:shadow-glow transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <a href="mailto:jessie@example.com" className="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400">
                jessie@example.com
              </a>
            </div>

            {/* Phone card */}
            <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl p-6 rounded-xl text-center transform-gpu hover:shadow-glow transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <a href="tel:+441234567890" className="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400">
                +44 123 456 7890
              </a>
            </div>

            {/* Social Media card */}
            <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl p-6 rounded-xl text-center transform-gpu hover:shadow-glow transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Social Media</h3>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

