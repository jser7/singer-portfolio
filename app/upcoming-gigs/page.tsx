"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navbar from "../../components/navbar"
import { Calendar, Clock, MapPin, Ticket } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Remove the genre property from each gig object
const upcomingGigs = [
  {
    id: 1,
    date: "25th June, 2025",
    time: "X:XX PM",
    venue: "Royal Norfolk Show",
    location: "Norfolk",
    description: "Jessie's performing at the Royal Norfolk Show!",
    ticketLink: "#",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jessie1-GuijAkZFmEU2UUP1Ucq46GwH5jhZjO.jpeg",
    color: "from-purple-500 to-pink-500",
    featured: true,
  },
  {
    id: 2,
    date: "June 28th, 2024",
    time: "X:XX PM",
    venue: "B2",
    location: "Norwich",
    description: "Jessie's performing at the B2!",
    ticketLink: "#",
    image: "/placeholder.svg?height=400&width=600",
    color: "from-blue-500 to-purple-500",
    featured: false,
  },
  {
    id: 3,
    date: "September 12th, 2024",
    time: "X:XX PM",
    venue: "B2",
    location: "Miami, FL",
    description: "Jessie's performing at the B2!",
    ticketLink: "#",
    image: "/placeholder.svg?height=400&width=600",
    color: "from-orange-500 to-red-500",
    featured: true,
  }
]

// 2. Remove the activeFilter state and related functions
export default function UpcomingGigsPage() {
  const containerRef = useRef(null)
  const headerRef = useRef(null)
  const featuredRef = useRef(null)
  const listRef = useRef(null)
  const gigRefs = useRef([])

  // Initialize refs array
  useEffect(() => {
    gigRefs.current = gigRefs.current.slice(0, upcomingGigs.length)
  }, [])

  // Set up animations
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return

    // Create a GSAP context for clean up
    const ctx = gsap.context(() => {
      // Initial animations
      const mainTl = gsap.timeline()

      // Header animation with text split effect
      mainTl.fromTo(
        headerRef.current.querySelectorAll(".animate-text"),
        {
          y: 100,
          opacity: 0,
          rotationX: 30,
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          stagger: 0.1,
          duration: 1.2,
          ease: "power3.out",
        },
      )

      // Featured gig animation
      mainTl.fromTo(
        featuredRef.current,
        {
          clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
          opacity: 0,
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          opacity: 1,
          duration: 1.5,
          ease: "power3.inOut",
        },
        "-=0.8",
      )

      // Animate the featured gig content
      mainTl.fromTo(
        featuredRef.current.querySelectorAll(".featured-content"),
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
        "-=1",
      )

      // Animate the list section
      mainTl.fromTo(
        listRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.5",
      )

      // Animate each gig card with staggered effect
      mainTl.fromTo(
        gigRefs.current,
        {
          scale: 0.9,
          y: 50,
          opacity: 0,
          rotationY: 5,
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          rotationY: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.7",
      )

      // Create hover animations for gig cards
      gigRefs.current.forEach((card) => {
        if (!card) return

        const hoverTl = gsap.timeline({ paused: true })

        hoverTl.to(card, {
          y: -10,
          scale: 1.03,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(139, 92, 246, 0.3)",
          duration: 0.4,
          ease: "power2.out",
        })

        // Add event listeners for hover
        card.addEventListener("mouseenter", () => hoverTl.play())
        card.addEventListener("mouseleave", () => hoverTl.reverse())
      })

      // Create floating animation for decorative elements
      const decorElements = document.querySelectorAll(".floating-element")
      decorElements.forEach((el, index) => {
        gsap.to(el, {
          y: index % 2 === 0 ? "20px" : "-20px",
          x: index % 3 === 0 ? "10px" : "-10px",
          rotation: index % 2 === 0 ? 5 : -5,
          duration: 3 + index,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2,
        })
      })

      // Animate background particles
      const particles = document.querySelectorAll(".particle")
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
      ctx.revert() // cleanup
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  // Get the featured gig
  const featuredGig = upcomingGigs.find((gig) => gig.featured)

  // Get non-featured gigs
  const regularGigs = upcomingGigs.filter((gig) => !gig.featured)

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

      {/* Header section */}
      <section ref={headerRef} className="relative z-10 pt-32 pb-16 px-4 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating-element absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="floating-element absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-pink-500/10 blur-3xl" />
        </div>

        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="animate-text text-5xl md:text-7xl font-bold mb-4 leading-tight">
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animated-gradient">
                UPCOMING SHOWS
              </span>
            </h1>
            <p className="animate-text text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Don't miss your chance to experience Jessie's electrifying live performances. Secure your tickets now for
              these upcoming events.
            </p>
          </div>
        </div>
      </section>

      {/* Featured gig section */}
      {featuredGig && (
        <section ref={featuredRef} className="relative z-10 py-12 px-4 overflow-hidden">
          <div className="container mx-auto max-w-6xl">
            <div className="relative rounded-3xl overflow-hidden">
              {/* Background image */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/80 to-transparent dark:from-black dark:via-black/80 dark:to-transparent z-10" />
                <img
                  src={featuredGig.image || "/placeholder.svg"}
                  alt={featuredGig.venue}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="relative z-20 p-8 md:p-12 lg:p-16 min-h-[400px] flex flex-col justify-center">
                <div className="max-w-2xl featured-content">
                  <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium mb-6">
                    Featured Event
                  </div>

                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{featuredGig.venue}</h2>

                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Calendar className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                      <span>{featuredGig.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="w-5 h-5 text-purple-400" />
                      <span>{featuredGig.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin className="w-5 h-5 text-purple-400" />
                      <span>{featuredGig.location}</span>
                    </div>
                  </div>

                  <p className="text-lg text-gray-300 mb-8">{featuredGig.description}</p>

                  <a
                    href={featuredGig.ticketLink}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-medium hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-glow"
                  >
                    <Ticket className="w-5 h-5" />
                    Get Tickets
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Gigs list section */}
      <section ref={listRef} className="relative z-10 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Remove filter bar */}

          {/* Gigs grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularGigs.map((gig, index) => (
              <div
                key={gig.id}
                ref={(el) => (gigRefs.current[index] = el)}
                className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl rounded-xl overflow-hidden transform transition-all duration-500"
              >
                {/* Card content */}
                <div className="relative">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={gig.image || "/placeholder.svg"}
                      alt={gig.venue}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{gig.venue}</h3>

                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                        <Calendar className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                        <span>{gig.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                        <Clock className="w-4 h-4 text-purple-400" />
                        <span>{gig.time}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 mb-4">
                      <MapPin className="w-4 h-4 text-purple-400" />
                      <span>{gig.location}</span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">{gig.description}</p>

                    <a
                      href={gig.ticketLink}
                      className={`inline-flex items-center gap-2 w-full justify-center px-4 py-2 bg-gradient-to-r ${gig.color} rounded-full text-white text-sm font-medium hover:opacity-90 transition-all duration-300 transform hover:scale-105`}
                    >
                      <Ticket className="w-4 h-4" />
                      Get Tickets
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

