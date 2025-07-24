"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navbar from "../../components/navbar"
import { Music, Mic, Award, Heart, Star, ChevronRight } from "lucide-react"
import Link from "next/link"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Bio timeline data
const bioTimeline = [
  {
    year: "Age 4",
    title: "Piano Lessons",
    description:
      "My parents quickly started me on piano lessons, which I didn't enjoy at first, but it quickly became a passion I couldn't live without in my formative years.",
    icon: <Music className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
  },
  {
    year: "Age 7",
    title: "First gig",
    description:
      "My song came second in a competition, and because of that I got to play an original piano piece called Nightingale at a small festival called Festival of the Arts.",
    icon: <Award className="w-6 h-6" />,
    color: "from-blue-500 to-purple-500",
  },
  {
    year: "Age 9",
    title: "Singing Lessons",
    description: "Singing lessons taught me not just how to become a better singer, but also how to properly take care of my voice and harness my passion.",
    icon: <Mic className="w-6 h-6" />,
    color: "from-pink-500 to-red-500",
  },
  {
    year: "2023-2025",
    title: "Regular Gigs",
    description:
      "Over the past few years, I've played regular gigs, honing my talent and performing whenever I can. My passion has blossomed into something truly beautiful and I'm so grateful that others can appreciate it as well.",
    icon: <Star className="w-6 h-6" />,
    color: "from-green-500 to-teal-500",
  }
]

// Testimonials data
const testimonials = [
  {
    quote:
      "As Jessie's best friend I have had the privilege to watch up close just how extraordinary she is, I am so proud of everything she has managed to achieve all on her own and can't wait to see her future successes as well. Her ability to connect with and produce music is incredible. She is definitely someone to watch as I imagine this girl is going to go so far",
    author: "Tilly Blake"
  },
  {
    quote:
      "A promising young voice in the local scene. Her performances create an intimate connection with the audience.",
    author: "Local Venue Manager"
    },
  {
    quote:
      "Jessie's passion for music shines through in every performance. She's definitely one to watch in the coming years.",
    author: "Music Teacher"
  },
]

export default function AboutPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const bioRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLElement>(null)
  const testimonialRef = useRef<HTMLElement>(null)
  const testimonialItemsRef = useRef<(HTMLElement | null)[]>([])
  const timelineItemsRef = useRef<(HTMLElement | null)[]>([])

  // Initialize refs arrays
  useEffect(() => {
    testimonialItemsRef.current = testimonialItemsRef.current.slice(0, testimonials.length)
  }, [])

  useEffect(() => {
    timelineItemsRef.current = timelineItemsRef.current.slice(0, bioTimeline.length)
  }, [])

  const addTestimonialItemRef = (el: HTMLElement | null, index: number) => {
    if (el) {
      testimonialItemsRef.current[index] = el
    }
  }

  const addTimelineItemRef = (el: HTMLElement | null, index: number) => {
    if (el) {
      timelineItemsRef.current[index] = el
    }
  }

  // Set up animations
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return

    // Create a GSAP context for clean up
    const ctx = gsap.context(() => {
      if (!heroRef.current) return

      // Only animate elements that are initially visible
      // Hero section animations - only run once
      const heroTitle = heroRef.current.querySelector<HTMLElement>(".hero-title")
      const heroSubtitle = heroRef.current.querySelector<HTMLElement>(".hero-subtitle")
      const heroImage = heroRef.current.querySelector<HTMLElement>(".hero-image")

      if (heroTitle) {
        gsap.fromTo(
          heroTitle,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        )
      }

      if (heroSubtitle) {
        gsap.fromTo(
          heroSubtitle,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 },
        )
      }

      if (heroImage) {
        gsap.fromTo(
          heroImage,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: "power2.out", delay: 0.3 },
        )
      }

      // Set up scroll-triggered animations that only run once when the element comes into view
      const sections = [
        { ref: bioRef.current, selector: ".bio-content" },
        { ref: timelineRef.current, selector: ".timeline-title" },
        { ref: testimonialRef.current, selector: ".testimonial-title" },
      ]

      sections.forEach((section) => {
        if (!section.ref) return

        const element = section.ref.querySelector(section.selector)
        if (!element) return

        // Set initial state
        gsap.set(element, { y: 30, opacity: 0 })

        // Create scroll trigger
        ScrollTrigger.create({
          trigger: section.ref,
          start: "top 80%",
          onEnter: () => {
            gsap.to(element, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" })
          },
          once: true,
        })
      })

      // Timeline items animation
      if (timelineRef.current) {
        // Set initial state
        timelineItemsRef.current.forEach((item, index) => {
          if (!item) return
          gsap.set(item, {
            x: index % 2 === 0 ? -30 : 30,
            opacity: 0,
          })
        })

        // Create scroll trigger
        ScrollTrigger.create({
          trigger: timelineRef.current,
          start: "top 70%",
          onEnter: () => {
            gsap.to(timelineItemsRef.current, {
              x: 0,
              opacity: 1,
              stagger: 0.2,
              duration: 0.8,
              ease: "power2.out",
            })
          },
          once: true,
        })
      }

      // Simplify floating animations to reduce performance impact
      const decorElements = document.querySelectorAll(".floating-element")
      decorElements.forEach((el, index) => {
        gsap.to(el, {
          y: index % 2 === 0 ? "10px" : "-10px",
          duration: 2 + (index % 2),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.1,
        })
      })

      // Reduce the number of particles for better performance
      const particles = document.querySelectorAll(".particle")
      particles.forEach((particle, index) => {
        if (index < 15) {
          // Only animate 15 particles
          gsap.to(particle, {
            y: `+=${Math.random() * 100 - 50}`,
            x: `+=${Math.random() * 100 - 50}`,
            duration: 8 + Math.random() * 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.04,
          })
        }
      })
    }, containerRef)

    return () => {
      ctx.revert() // cleanup
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, []) // Empty dependency array ensures this only runs once

  // Handle testimonial rotation
  useEffect(() => {
    if (!testimonialItemsRef.current[0]) return

    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [])

  // Animate testimonial change
  useEffect(() => {
    if (!testimonialItemsRef.current[0]) return

    const tl = gsap.timeline()

    // Fade out all testimonials
    testimonialItemsRef.current.forEach((item, index) => {
      if (index !== activeTestimonial) {
        gsap.set(item, { opacity: 0, y: 20, scale: 0.95, display: "none" })
      }
    })

    // Fade in active testimonial
    tl.fromTo(
      testimonialItemsRef.current[activeTestimonial],
      { opacity: 0, y: 20, scale: 0.95, display: "block" },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" },
    )
  }, [activeTestimonial])

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />

      {/* Particle background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-white dark:bg-black opacity-90" />

        {/* Animated particles */}
        {Array.from({ length: 15 }).map((_, index) => (
          <div
            key={index}
            className="particle absolute w-2 h-2 rounded-full opacity-30 dark:opacity-30"
            style={{
              backgroundColor: index % 3 === 0 ? "#EC4899" : index % 3 === 1 ? "#8B5CF6" : "#3B82F6",
            }}
          />
        ))}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/80 to-white dark:via-black/80 dark:to-black" />
      </div>

      {/* Hero section */}
      <section ref={heroRef} className="relative z-10 min-h-screen flex items-center pt-24 pb-16 px-4 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating-element absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="floating-element absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-pink-500/10 blur-3xl" />
        </div>

        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="hero-title text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="block">Meet</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animated-gradient">
                  Jessie Hope
                </span>
              </h1>

              <p className="hero-subtitle text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                17-year-old singer-songwriter and college student with a passion for creating authentic music that
                connects with listeners.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/gigs"
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-medium hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-glow"
                >
                  Past Performances
                </Link>

                <Link
                  href="/upcoming-gigs"
                  className="px-6 py-3 bg-transparent border border-white/30 rounded-full text-white font-medium hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                >
                  Upcoming Shows
                </Link>
              </div>
            </div>

            <div className="hero-image relative">
              <div className="relative w-full max-w-md mx-auto aspect-square rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 p-1">
                <div className="w-full h-full rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jessie1-GuijAkZFmEU2UUP1Ucq46GwH5jhZjO.jpeg"
                    alt="Jessie Hope"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Decorative circles */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 floating-element" />
                <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 floating-element" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio section */}
      <section
        ref={bioRef}
        className="relative z-10 py-20 px-4 bg-gradient-to-b from-white via-purple-50/5 to-purple-50/10 dark:from-black dark:via-purple-900/5 dark:to-purple-900/10"
      >
        <div className="container mx-auto max-w-4xl">
          <div className="bio-content">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                My Story
              </span>
            </h2>

            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300">
              <p>
              Music has always been more than just a hobby for me; it's a fundamental part of who I am. From such a young age, I was drawn to the emotional power of melodies and rhythms. Whether I'm listening to my favorite artists like Olivia, Dean, or Sara Bareilles  or creating my own songs, music allows me to express feelings and ideas that I often struggle to articulate in everyday conversation.
              </p>

              <p>
              My journey into music began with simple piano lessons. I was born in North London, but my family moved to Uganda in Africa when I was around only three or four years old. I lived there for seven years and when I was around four, my parents started me straight away on piano lessons. I never loved it at first but then as I grew it quickly evolved into a passion that I could not live without. 
              </p>

              <p>
              I've been singing as long as I can remember. I started grades I'd like to say in year five I was always told I had a big powerful voice, but having lessons really made me understand singing and how to do it right and how to take care of your voice properly. When I was in year nine I finished my grade 8 singing performance exam and was so happy to hear I got a distinction. combining both of these two elements gives me the freedom to write music 
I love experimenting with different genres, blending elements of singer-songwriter, ballad, and indie music to create something that feels uniquely mine. There's something incredibly fulfilling about crafting a song from scratch, pouring my heart into the lyrics, and then sharing it with others.

              </p>

              <p>
              I'm not really sure what my first gig was. I think that I showed my piano teacher a new piece that I'd come up with and I named it the Nightingale and it was a really simple piano melody, which I got to play at this small festival called festival all of the arts because I got chosen for this competition and my song came second place. Ever since then my writing and composing has blossomed into this amazing passion, which I adore. I now play gigs often. Hey awesome previous gigs that I have played last year. I had the amazing opportunity to play at latitude 2024 which was an unreal experience. I've played the other small festivals like Stradbrooke music day. And Eye's festival of the lights. As well as the John Peel center. And many local pubs and restaurants like the cock and pie, the lion's head and many more.
              </p>

              <p>
              Ultimately, music is my sanctuary, my creative outlet, and my way of connecting with the world. It challenges me to grow, to explore new sonic landscapes, and to find beauty in the everyday moments of life. As I continue to develop as a musician, I hope to inspire others to embrace their own creative passions and to find solace and joy in the power of music.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline section */}
      <section
        ref={timelineRef}
        className="relative z-10 py-20 px-4 bg-gradient-to-b from-purple-50/10 via-purple-50/5 to-white dark:from-purple-900/10 dark:via-purple-900/5 dark:to-black"
      >
        <div className="container mx-auto max-w-5xl">
          <h2 className="timeline-title text-3xl md:text-4xl font-bold mb-16 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              Musical Journey
            </span>
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 to-pink-500 opacity-30" />

            {/* Timeline items */}
            {bioTimeline.map((item, index) => (
              <div
                key={item.year}
                ref={(el) => addTimelineItemRef(el as HTMLElement, index)}
                className={`timeline-item relative flex justify-start
                 mb-8`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center z-10">
                  {item.icon}
                </div>

                {/* Content */}
                <div className={`w-5/12 pl-12 text-left"`}>
                  <div className="mb-2">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${item.color} text-white`}
                    >
                      {item.year}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>

                {/* Empty space for the other side */}
                <div className="w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials section - redesigned */}
      <section
        ref={testimonialRef}
        className="relative z-10 py-20 px-4 bg-gradient-to-b from-white via-purple-50/5 to-purple-50/10 dark:from-black dark:via-purple-900/5 dark:to-purple-900/10"
      >
        <div className="container mx-auto max-w-4xl">
          <h2 className="testimonial-title text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              What People Say
            </span>
          </h2>

          <div className="relative">
            {/* Testimonial cards */}
            <div className="relative min-h-[200px] mb-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  ref={(el) => addTestimonialItemRef(el as HTMLElement, index)}
                  className={`testimonial-item ${index === activeTestimonial ? "block" : "hidden"}`}
                >
                  <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl p-8 rounded-2xl border border-gray-200 dark:border-gray-800">
                    <div className="flex flex-col md:flex-row gap-6 items-center">

                      <div>
                        <p className="text-xl italic mb-4 text-gray-600 dark:text-gray-300">"{testimonial.quote}"</p>
                        <p className="text-lg font-medium text-purple-600 dark:text-purple-400">
                          — {testimonial.author}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation dots - moved below the cards */}
            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 w-6"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="relative z-10 py-20 px-4 bg-gradient-to-b from-purple-50/10 to-white dark:from-purple-900/10 dark:to-black">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              Join My Journey
            </span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            I'm just getting started, and I'd love to have you along for the ride! Check out my upcoming shows, follow
            me on social media, or reach out if you'd like me to perform at your event.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/upcoming-gigs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-medium hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-glow"
            >
              Upcoming Shows
              <ChevronRight className="w-5 h-5" />
            </Link>

            <Link
              href="/contact"
              className="px-6 py-3 bg-transparent border border-white/30 rounded-full text-white font-medium hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

