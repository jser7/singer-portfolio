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

interface UpcomingGig {
  id: number
  date: string
  time: string
  venue: string
  location: string
  description: string
  ticketLink: string
  image: string
  color: string
  featured: boolean
}

// Remove the genre property from each gig object
const upcomingGigs: UpcomingGig[] = [
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

export default function UpcomingGigsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const gigsSectionRef = useRef<HTMLElement>(null)
  const gigRefs = useRef<(HTMLElement | null)[]>([])

  // Initialize refs array
  useEffect(() => {
    gigRefs.current = gigRefs.current.slice(0, upcomingGigs.length)
  }, [])

  const addToRefs = (el: HTMLElement | null, index: number) => {
    if (el) {
      gigRefs.current[index] = el
    }
  }

  // Set up animations after component mounts
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return

    const ctx = gsap.context(() => {
      if (!heroRef.current || !titleRef.current || !subtitleRef.current || !scrollIndicatorRef.current) return

      // Hero section animations
      const tl = gsap.timeline()

      const titleSpan = titleRef.current.querySelector("span")
      if (titleSpan) {
        tl.fromTo(
          titleSpan,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        )
      }

      tl.fromTo(
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
      <section ref={heroRef} className="relative z-10 pt-32 pb-16 px-4 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating-element absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="floating-element absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-pink-500/10 blur-3xl" />
        </div>

        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 ref={titleRef} className="animate-text text-5xl md:text-7xl font-bold mb-4 leading-tight">
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animated-gradient">
                UPCOMING SHOWS
              </span>
            </h1>
            <p ref={subtitleRef} className="animate-text text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Don't miss your chance to experience Jessie's electrifying live performances. Secure your tickets now for
              these upcoming events.
            </p>
          </div>
        </div>
      </section>

      {/* Featured gig section */}
      {featuredGig && (
        <section ref={gigsSectionRef} className="relative z-10 py-12 px-4 overflow-hidden">
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
      <section ref={gigsSectionRef} className="relative z-10 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Remove filter bar */}

          {/* Gigs grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularGigs.map((gig, index) => (
              <div
                key={gig.id}
                ref={(el) => addToRefs(el as HTMLElement, index)}
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

