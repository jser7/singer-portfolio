"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navbar from "../navbar"
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
  const textRef = useRef(null)
  const navbarRef = useRef(null)
  const contentRef = useRef(null)
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
    const sections = document.querySelectorAll(".scroll-section")

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

      // Animate the section content
      tl.fromTo(
        section.querySelector(".section-content"),
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

      // Add floating animation to decorative elements
      const decorativeElements = section.querySelectorAll(".floating-element")
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
    gsap.utils.toArray(".parallax-bg").forEach((bg: any) => {
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
    <main className="min-h-screen flex flex-col bg-black overflow-x-hidden relative">
      <BackgroundImage />

      {/* Initial centered text that zooms in */}
      {!animationComplete && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <h1
            ref={textRef}
            className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"
          >
            Jessie Hope
          </h1>
        </div>
      )}

      {/* Navbar that appears after animation */}
      <div ref={navbarRef} className="opacity-0">
        <Navbar />
      </div>

      {/* Content sections that appear after the initial animation */}
      <div ref={contentRef} className="opacity-0 w-full">
        <HeroSection />
        <BookingSection />
        <RecordingSection />
        <PerformanceSection />
      </div>
    </main>
  )
}

