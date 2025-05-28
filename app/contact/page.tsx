"use client"

import { useState, useEffect, useRef, FormEvent, ChangeEvent, MouseEvent } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navbar from "../../components/navbar"

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactPage() {
  // Register ScrollTrigger plugin
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
  }, [])

  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Refs for GSAP animations
  const pageRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const formContainerRef = useRef<HTMLFormElement>(null)
  const formFieldsRef = useRef<(HTMLElement | null)[]>([])
  const contactCardsRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])

  // Background particles effect
  const particlesRef = useRef<HTMLDivElement>(null)

  // Store handleMouseMove in a ref to maintain the same reference
  const handleMouseMoveRef = useRef((e: globalThis.MouseEvent): void => {})

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSubmitted(true)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Initialize refs array
  useEffect(() => {
    formFieldsRef.current = formFieldsRef.current.slice(0, 4) // 4 form fields
    cardRefs.current = cardRefs.current.slice(0, 3) // 3 contact cards
  }, [])

  const addToFormFieldsRef = (el: HTMLElement | null, index: number) => {
    if (el) {
      formFieldsRef.current[index] = el
    }
  }

  const addToCardRefs = (el: HTMLElement | null, index: number) => {
    if (el) {
      cardRefs.current[index] = el
    }
  }

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
        // Page entrance animations with better staggers and reveals
        tl.fromTo(titleRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
          .fromTo(
            titleRef.current.querySelectorAll("span"),
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" },
            "-=0.5",
          )
      }

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6",
        )
      }

      if (formContainerRef.current) {
        tl.fromTo(
          formContainerRef.current,
          { opacity: 0, y: 100, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power4.out" },
          "-=0.4",
        )

        // Create 3D hover effect for form container
        const formElement = formContainerRef.current
        
        // Update the handleMouseMove reference
        handleMouseMoveRef.current = (e: globalThis.MouseEvent) => {
          const rect = formElement.getBoundingClientRect()
          const mouseX = e.clientX - rect.left
          const mouseY = e.clientY - rect.top

          const centerX = rect.width / 2
          const centerY = rect.height / 2

          const rotateX = (mouseY - centerY) / 40
          const rotateY = (centerX - mouseX) / 40

          gsap.to(formElement, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.5,
            ease: "power2.out",
          })
        }

        formElement.addEventListener("mousemove", handleMouseMoveRef.current)
      }

      // Filter out null values from formFieldsRef
      const validFormFields = formFieldsRef.current.filter((field): field is HTMLElement => field !== null)

      // Stagger form fields animation
      if (validFormFields.length > 0) {
        tl.fromTo(
          validFormFields,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.4",
        )
      }

      // Filter out null values from cardRefs
      const validCardRefs = cardRefs.current.filter((card): card is HTMLElement => card !== null)

      // Animate contact cards
      if (validCardRefs.length > 0) {
        tl.fromTo(
          validCardRefs,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
          },
          "-=0.6",
        )

        // Add hover animations for cards
        validCardRefs.forEach((card) => {
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
    }, pageRef)

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

      {/* Contact form section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-6 text-center leading-tight">
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500">
              Get in Touch
            </span>
          </h1>

          <p ref={subtitleRef} className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Have a question or want to book a performance? Fill out the form below and I'll get back to you as soon as
            possible.
          </p>

          {/* Contact form */}
          <form
            ref={formContainerRef}
            onSubmit={handleSubmit}
            className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl p-8 rounded-2xl shadow-lg transform-gpu"
            style={{ perspective: "1000px" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  ref={(el) => addToFormFieldsRef(el as HTMLInputElement, 0)}
                  type="text"
                  id="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  ref={(el) => addToFormFieldsRef(el as HTMLInputElement, 1)}
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject
              </label>
              <input
                ref={(el) => addToFormFieldsRef(el as HTMLInputElement, 2)}
                type="text"
                id="subject"
                value={formState.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                ref={(el) => addToFormFieldsRef(el as HTMLTextAreaElement, 3)}
                id="message"
                value={formState.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-lg text-white font-medium transition-all duration-300 transform hover:scale-[1.02] ${
                isSubmitting
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-glow"
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {submitted && (
              <div className="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-500">
                Thank you for your message! I'll get back to you soon.
              </div>
            )}
          </form>

          {/* Contact cards */}
          <div ref={contactCardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {/* Email card */}
            <div
              ref={(el) => addToCardRefs(el as HTMLDivElement, 0)}
              className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl p-6 rounded-xl text-center transform-gpu hover:shadow-glow transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-600 dark:text-gray-300">jessie@example.com</p>
            </div>

            {/* Phone card */}
            <div
              ref={(el) => addToCardRefs(el as HTMLDivElement, 1)}
              className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl p-6 rounded-xl text-center transform-gpu hover:shadow-glow transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-gray-600 dark:text-gray-300">+44 123 456 7890</p>
            </div>

            {/* Social media card */}
            <div
              ref={(el) => addToCardRefs(el as HTMLDivElement, 2)}
              className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl p-6 rounded-xl text-center transform-gpu hover:shadow-glow transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Social Media</h3>
              <p className="text-gray-600 dark:text-gray-300">@jessie_singer</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

