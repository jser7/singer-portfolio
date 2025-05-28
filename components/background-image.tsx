"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function BackgroundImage() {
  const bgRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    gsap.registerPlugin(ScrollTrigger)

    // Parallax effect for the background image
    gsap.to(bgRef.current, {
      yPercent: 30,
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    })

    // Animate overlay opacity based on scroll
    gsap.to(overlayRef.current, {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "25% top",
        scrub: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <>
      {/* Fixed background image */}
      <div
        ref={bgRef}
        className="fixed inset-0 w-full h-full z-0"
        style={{
          backgroundImage:
            'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jessie1-GuijAkZFmEU2UUP1Ucq46GwH5jhZjO.jpeg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          willChange: "transform",
        }}
      />

      {/* Gradient overlay that changes opacity on scroll */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-0 bg-gradient-to-b from-white/40 via-white/60 to-white/90 dark:from-black/40 dark:via-black/60 dark:to-black/90"
        style={{ willChange: "background-color" }}
      />
    </>
  )
}

