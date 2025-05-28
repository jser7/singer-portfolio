"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Link from "next/link"

export default function HeroSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const textRef = useRef(null)
  const buttonsRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "center center",
        scrub: 1,
      },
    })

    // Animations remain the same
    gsap.set(headingRef.current, { perspective: 400 })
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, rotateX: 90, y: 100 },
      { opacity: 1, rotateX: 0, y: 0, duration: 1.5, ease: "power4.out" }
    )

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" }
    )

    gsap.fromTo(
      buttonsRef.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, delay: 1, ease: "back.out(1.7)" }
    )

    return () => {
      if (tl) tl.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 px-4 relative"
      style={{ 
        position: 'relative', 
        zIndex: 0,  // Lower z-index
        marginTop: '80px', // Add margin-top instead of padding
        pointerEvents: 'auto' // Explicitly set pointer-events
      }}
    >
      <div className="section-content text-center max-w-4xl mx-auto relative z-10">
        <h2 ref={headingRef} className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white mb-8">
          Captivating Vocals & Unforgettable Performances
        </h2>
        <p ref={textRef} className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12">
          Experience the soulful sound and powerful range of Jessie Hope. From intimate venues to grand stages, every
          performance is a journey through emotion and melody.
        </p>
        <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-medium hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-glow w-full sm:w-auto">
            Listen Now
          </button>
          <Link
            href="/upcoming-gigs"
            className="px-8 py-3 bg-transparent border border-white/30 rounded-full text-white font-medium hover:bg-white/10 transition-all duration-300 backdrop-blur-sm w-full sm:w-auto text-center"
          >
            Upcoming Shows
          </Link>
        </div>
      </div>

      {/* Decorative floating elements with explicit pointer-events-none */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="floating-element absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-pink-500/10 blur-3xl" />
      </div>
    </section>
  )
}

