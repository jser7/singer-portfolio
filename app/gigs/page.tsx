"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navbar from "../../components/navbar"
import Link from "next/link"
import GigGalleryModal from "../../components/gig-gallery-modal"
import GigDetailsModal from "../../components/gig-details-modal"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface GigDetails {
  setlist: string[]
  musicians: string[]
  notes: string
}

interface Gig {
  id: number
  date: string
  venue: string
  location: string
  description: string
  image: string
  highlight: boolean
  color: string
  gallery: string[]
  details: GigDetails
}

// Past gigs data
const pastGigs: Gig[] = [
  {
    id: 1,
    date: "December 15, 2023",
    venue: "Stradbroke music day",
    location: "Stradbroke",
    description: "Jessie performed at the local music event Stradbroke Music Day",
    image: "/images/IMG_8602.jpeg",
    highlight: true,
    color: "from-purple-500 to-pink-500",
    gallery: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jessie1-GuijAkZFmEU2UUP1Ucq46GwH5jhZjO.jpeg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    details: {
      setlist: ["Midnight Dreams", "Lost in the City", "Remember When", "Echoes", "Final Goodbye"],
      musicians: ["Jessie Hope - Vocals", "Alex Chen - Guitar", "Maria Rodriguez - Bass", "Tom Wilson - Drums"],
      notes:
        ".",
    },
  },
  {
    id: 2,
    date: "Unknown",
    venue: "Latitude",
    location: "Suffolk",
    description: "Jessie performed at Latitude Festival!",
    image: "/images/IMG_8605.jpeg",
    highlight: false,
    color: "from-pink-500 to-red-500",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    details: {
      setlist: ["New Horizons", "Southern Skies", "Whispers", "Tomorrow's Promise", "Daybreak"],
      musicians: ["Jessie Hope - Vocals/Guitar"],
      notes:
        "idk (jessie fill this in)",
    },
  },
  {
    id: 3,
    date: "Unknown",
    venue: "Eye Festival of Lights",
    location: "Eye",
    description: "Festival appearance at Eye.",
    image: "/images/IMG_8606.jpeg",
    highlight: true,
    color: "from-indigo-500 to-blue-500",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    details: {
      setlist: ["Opening Act", "Summer Nights", "Wildflower", "Desert Wind", "Closing Time"],
      musicians: ["Jessie Hope - Vocals", "Full Festival Band"],
      notes:
        "Jessie's festival appearance at Festival of Lights was a magic performance, where she displayed her extraordinary musical talents.",
    },
  }
]

export default function GigsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const gigsSectionRef = useRef<HTMLElement>(null)
  const gigRefs = useRef<(HTMLElement | null)[]>([])

  const [selectedGig, setSelectedGig] = useState<Gig | null>(null)
  const [showGallery, setShowGallery] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  // Initialize refs array
  useEffect(() => {
    gigRefs.current = gigRefs.current.slice(0, pastGigs.length)
  }, [])

  // Set up animations after component mounts
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return

    const ctx = gsap.context(() => {
      if (!heroRef.current || !titleRef.current || !subtitleRef.current || !scrollIndicatorRef.current) return

      // Hero section animations
      const tl = gsap.timeline()

      tl.fromTo(
        titleRef.current.querySelector("span"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4",
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.2",
        )

      // Filter out null values from gigRefs
      const validGigRefs = gigRefs.current.filter((ref): ref is HTMLElement => ref !== null)

      // Animate gig cards when they come into view
      if (validGigRefs.length > 0) {
        validGigRefs.forEach((card, index) => {
          ScrollTrigger.create({
            trigger: card,
            start: "top bottom-=100",
            onEnter: () => {
              gsap.to(card, {
                scale: 1,
                opacity: 1,
                duration: 0.6,
                ease: "power2.out",
                delay: index * 0.1,
              })
            },
          })

          // Add hover animations
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -10,
              scale: 1.02,
              duration: 0.3,
              ease: "power2.out",
            })
          })

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            })
          })
        })
      }

      // Animate particles
      const particles = document.querySelectorAll<HTMLElement>(".particle")
      particles.forEach((particle, index) => {
        const delay = index * 0.04
        const duration = 10 + Math.random() * 30

        gsap.set(particle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: Math.random() * 0.5 + 0.5,
        })

        gsap.to(particle, {
          y: `+=${Math.random() * 200 - 100}`,
          x: `+=${Math.random() * 200 - 100}`,
          rotation: Math.random() * 360,
          duration: duration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: delay,
        })
      })
    }, containerRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const addToRefs = (el: HTMLElement | null, index: number) => {
    if (el) {
      gigRefs.current[index] = el
    }
  }

  // Handle opening the gallery modal
  const openGallery = (gig: Gig) => {
    setSelectedGig(gig)
    setShowGallery(true)
  }

  // Handle opening the details modal
  const openDetails = (gig: Gig) => {
    setSelectedGig(gig)
    setShowDetails(true)
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden"
    >
      <Navbar />

      {/* Particle background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-white dark:bg-black opacity-90" />

        {/* Animated particles */}
        {Array.from({ length: 30 }).map((_, index) => (
          <div
            key={index}
            className="particle absolute w-2 h-2 rounded-full opacity-20 dark:opacity-30"
            style={{
              backgroundColor: index % 3 === 0 ? "#EC4899" : index % 3 === 1 ? "#8B5CF6" : "#3B82F6",
            }}
          />
        ))}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/80 to-white dark:via-black/80 dark:to-black" />
      </div>

      {/* Hero section */}
      <section
        ref={heroRef}
        className="relative z-10 min-h-[60vh] flex flex-col items-center justify-center pt-24 pb-12 px-4 overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating-element absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="floating-element absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-pink-500/10 blur-3xl" />
        </div>

        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animated-gradient">
              LIVE EXPERIENCES
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Journey through Jessie's most memorable performances across iconic venues and intimate spaces. Each gig
            tells a story of connection, passion, and musical exploration.
          </p>
        </div>

        {/* Scroll indicator - Now properly centered */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-0 right-0 mx-auto w-max flex flex-col items-center animate-bounce"
        >
          <span className="text-sm text-gray-400 mb-2">Scroll to Explore</span>
          <svg
            className="w-6 h-6 text-purple-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Gigs showcase section */}
      <section ref={gigsSectionRef} className="relative z-10 py-20 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Gigs grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {pastGigs.map((gig, index) => (
              <div
                key={gig.id}
                ref={(el) => addToRefs(el, index)}
                className="gig-card group relative bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl overflow-hidden transform transition-all duration-700 card-inactive"
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
              >
                {/* Card content */}
                <div className="relative h-full flex flex-col">
                  {/* Image container with overlay */}
                  <div className="relative h-64 overflow-hidden">
                    <div
                      className="gig-image absolute inset-0 transition-transform duration-700 ease-out"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <img
                        src={gig.image || "/placeholder.svg"}
                        alt={`Jessie performing at ${gig.venue}`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Gradient overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent opacity-80`}
                    />

                    {/* Colored accent border */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gig.color}`} />

                  </div>

                  {/* Content */}
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="mb-4">
                      {/* Modified venue title to always remain visible */}
                      <h3 className="text-2xl font-bold mb-1 venue-title transition-all duration-300 ease-out text-gray-900 dark:text-white">
                        {gig.venue}
                      </h3>
                      <div className="text-gray-600 dark:text-gray-400">{gig.location}</div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow">{gig.description}</p>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-black/40 to-transparent transition-opacity duration-300 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming shows section */}
      <section className="relative z-10 py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              Catch Jessie Live
            </span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Don't miss the chance to experience the energy and emotion of a live performance. Check out upcoming shows
            and secure your tickets today.
          </p>

          <Link
            href="/upcoming-gigs"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white text-lg font-medium hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-glow"
          >
            View Upcoming Shows
          </Link>
        </div>
      </section>

      {/* Gallery Modal */}
      {showGallery && selectedGig && <GigGalleryModal gig={selectedGig} onClose={() => setShowGallery(false)} />}

      {/* Details Modal */}
      {showDetails && selectedGig && <GigDetailsModal gig={selectedGig} onClose={() => setShowDetails(false)} />}
    </div>
  )
}

