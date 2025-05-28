"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navbar from "../components/navbar"
import HeroSection from "../sections/hero-section"
import BookingSection from "../sections/booking-section"
import RecordingSection from "../sections/recording-section"
import PerformanceSection from "../sections/performance-section"
import BackgroundImage from "../components/background-image"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const textRef = useRef<HTMLDivElement>(null)
  const navbarRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    // Initial timeline for the text animation
    const tl = gsap.timeline({
      onComplete: () => setAnimationComplete(true),
    })

    // Start with text visible but hold it for a moment before zooming
    tl.fromTo(
      textRef.current,
      {
        opacity: 0,
        scale: 0.3,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
      },
    )

      // Hold the text in place for 1.5 seconds so it's readable
      .to(textRef.current, {
        scale: 1,
        duration: 1.5,
        ease: "none",
      })

      // Then zoom it in continuously until it's off-screen
      .to(textRef.current, {
        scale: 15,
        opacity: 0,
        duration: 2,
        ease: "power2.in",
      })

      // Hide the zoomed text
      .set(textRef.current, {
        display: "none",
      })

      // Show the navbar
      .fromTo(
        navbarRef.current,
        {
          y: -50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
      )

      // Reveal the content
      .fromTo(
        contentRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.4",
      )

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  // Set up scroll animations after the initial animation is complete
  useEffect(() => {
    if (!animationComplete) return

    // Set up scroll animations for each section
    const sections = document.querySelectorAll<HTMLElement>(".scroll-section")

    sections.forEach((section, i) => {
      // Create a timeline for each section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "center center",
          scrub: 1,
        },
      })

      const sectionContent = section.querySelector<HTMLElement>(".section-content")
      if (sectionContent) {
        // Animate the section content
        tl.fromTo(
          sectionContent,
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
          },
        )
      }

      // Add floating animation to decorative elements
      const decorativeElements = section.querySelectorAll<HTMLElement>(".floating-element")
      decorativeElements.forEach((element) => {
        gsap.to(element, {
          y: "20px",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        })
      })
    })

    // Add parallax effect to background sections
    const parallaxBgs = gsap.utils.toArray<HTMLElement>(".parallax-bg")
    parallaxBgs.forEach((bg) => {
      gsap.to(bg, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: bg.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [animationComplete])

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden">
      <Navbar />
      <BackgroundImage />

      {/* Initial text animation */}
      <div
        ref={textRef}
        className="fixed inset-0 flex items-center justify-center text-5xl md:text-7xl font-bold text-center z-50"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500">
          Welcome to Jessie's World
        </span>
      </div>

      {/* Main content */}
      <div ref={contentRef} className="opacity-0">
        <HeroSection />
        <BookingSection />
        <RecordingSection />
        <PerformanceSection />
      </div>
    </div>
  )
}

