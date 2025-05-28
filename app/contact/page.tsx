"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navbar from "../../components/navbar"

export default function ContactPage() {
  // Register ScrollTrigger plugin
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
  }, [])

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Refs for GSAP animations
  const pageRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const formContainerRef = useRef(null)
  const formFieldsRef = useRef([])
  const contactCardsRef = useRef(null)
  const cardRefs = useRef([])

  // Background particles effect
  const particlesRef = useRef(null)

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)

      // Success animation with staggered reveals
      const successTimeline = gsap.timeline()
      successTimeline
        .fromTo(
          ".success-icon",
          { scale: 0, opacity: 0, rotation: -180 },
          { scale: 1, opacity: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)" },
        )
        .fromTo(
          ".success-text",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.15, ease: "power3.out" },
        )

      // Reset form after showing success message
      setTimeout(() => {
        setSubmitted(false)
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      }, 3000)
    }, 1500)
  }

  useEffect(() => {
    // Create particles for background
    const createParticles = () => {
      if (!particlesRef.current) return

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
        particle.style.left = `${Math.random() * 100}%`
        particle.style.top = `${Math.random() * 100}%`

        // Random opacity
        particle.style.opacity = Math.random() * 0.6 + 0.1

        // Add particle to container
        container.appendChild(particle)

        // Animate each particle
        gsap.to(particle, {
          x: `${(Math.random() - 0.5) * 200}`,
          y: `${(Math.random() - 0.5) * 200}`,
          duration: Math.random() * 20 + 20,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })

        gsap.to(particle, {
          opacity: Math.random() * 0.4 + 0.1,
          duration: Math.random() * 5 + 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      }
    }

    // Initial animations with GSAP
    const tl = gsap.timeline()

    // Page entrance animations with better staggers and reveals
    tl.fromTo(titleRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
      .fromTo(
        titleRef.current.querySelectorAll("span"),
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" },
        "-=0.5",
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6",
      )
      .fromTo(
        formContainerRef.current,
        { opacity: 0, y: 100, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power4.out" },
        "-=0.4",
      )
      .fromTo(
        formFieldsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" },
        "-=0.5",
      )

    // Add a separate timeline for contact cards with scroll trigger
    const cardsTl = gsap.timeline({
      scrollTrigger: {
        trigger: contactCardsRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none none",
      },
    })

    cardsTl.fromTo(
      cardRefs.current,
      { opacity: 0, y: 50, rotationX: 10 },
      { opacity: 1, y: 0, rotationX: 0, duration: 0.7, stagger: 0.2, ease: "back.out(1.2)" },
    )

    // Create 3D hover effect for form container
    const formElement = formContainerRef.current

    formElement.addEventListener("mousemove", (e) => {
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
    })

    formElement.addEventListener("mouseleave", () => {
      gsap.to(formElement, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
      })
    })

    // Setup input field focus animations
    formFieldsRef.current.forEach((field) => {
      const input = field.querySelector("input") || field.querySelector("textarea")
      if (!input) return

      input.addEventListener("focus", () => {
        gsap.to(field, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        })
      })

      input.addEventListener("blur", () => {
        gsap.to(field, {
          scale: 1,
          duration: 0.3,
          ease: "power2.in",
        })
      })
    })

    // Setup enhanced hover animations for cards with 3D effect
    cardRefs.current.forEach((card, index) => {
      gsap.set(card, { transformStyle: "preserve-3d", transformOrigin: "center center" })

      const cardIcon = card.querySelector(".card-icon")
      const cardContent = card.querySelector(".card-content")

      card.addEventListener("mouseenter", () => {
        // Animate the card with 3D effect
        gsap.to(card, {
          y: -10,
          scale: 1.05,
          boxShadow: "0 20px 30px rgba(0,0,0,0.2)",
          duration: 0.4,
          ease: "power2.out",
        })

        // Animate the icon
        gsap.to(cardIcon, {
          scale: 1.2,
          y: -8,
          rotationY: 10,
          z: 30,
          duration: 0.4,
          ease: "back.out(1.7)",
        })

        // Animate the content
        gsap.to(cardContent, {
          y: 5,
          z: 20,
          duration: 0.4,
          ease: "power2.out",
        })
      })

      card.addEventListener("mouseleave", () => {
        // Animate the card back
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
          duration: 0.6,
          ease: "power2.inOut",
        })

        // Animate the icon back
        gsap.to(cardIcon, {
          scale: 1,
          y: 0,
          rotationY: 0,
          z: 0,
          duration: 0.4,
          ease: "power2.inOut",
        })

        // Animate the content back
        gsap.to(cardContent, {
          y: 0,
          z: 0,
          duration: 0.4,
          ease: "power2.inOut",
        })
      })

      // Add parallax effect within card based on mouse position
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const moveX = (mouseX - centerX) / 10
        const moveY = (mouseY - centerY) / 10

        gsap.to(cardIcon, {
          x: moveX * 0.5,
          y: moveY * 0.5 - 4,
          duration: 0.2,
          ease: "power2.out",
        })

        gsap.to(cardContent, {
          x: moveX * 0.2,
          y: moveY * 0.2 + 2,
          duration: 0.2,
          ease: "power2.out",
        })
      })
    })

    // Create particles on load and window resize
    createParticles()
    window.addEventListener("resize", createParticles)

    return () => {
      window.removeEventListener("resize", createParticles)
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden relative"
    >
      <Navbar />
      {/* Static gradient background with no animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-fuchsia-100/30 to-pink-100/40 dark:from-purple-900/50 dark:via-fuchsia-800/30 dark:to-pink-800/40 z-0" />

      {/* Particle container */}
      <div ref={particlesRef} className="absolute inset-0 z-0 overflow-hidden" />

      {/* Static gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-purple-300/20 to-pink-300/20 dark:from-purple-700/20 dark:to-pink-600/20 blur-3xl z-0" />
      <div className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full bg-gradient-to-r from-indigo-300/20 to-purple-300/20 dark:from-indigo-600/20 dark:to-purple-600/20 blur-3xl z-0" />
      <div className="absolute top-2/3 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-fuchsia-300/20 to-pink-300/20 dark:from-fuchsia-600/20 dark:to-pink-600/20 blur-3xl z-0" />

      <main className="relative z-10 pt-24">
        <section className="min-h-screen flex flex-col items-center justify-center py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h1 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="inline-block text-gray-900 dark:text-white">Get in Touch With&nbsp;</span>
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500">
                  {" "}
                  Jessie
                </span>
              </h1>

              <p ref={subtitleRef} className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Have a question or just want to say hello? Feel free to reach out directly to Jessie.
              </p>
            </div>

    

            {/* Contact info cards with enhanced animations */}
            <div ref={contactCardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                { icon: "📧", title: "Email", info: "jessie@musicbyjessie.com" },
                { icon: "📱", title: "Phone", info: "+1 (555) 123-4567" },
                { icon: "🌎", title: "Social", info: "@musicbyjessie" },
              ].map((item, index) => (
                <div
                  key={index}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className="contact-card relative rounded-2xl overflow-hidden group cursor-pointer"
                >
                  {/* Card border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Card content */}
                  <div className="relative m-[2px] bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-6 rounded-[calc(1rem-2px)] flex flex-col items-center text-center">
                    <div className="card-icon text-3xl mb-3 transition-transform duration-300">{item.icon}</div>
                    <div className="card-content">
                      <h3 className="text-gray-900 dark:text-white font-medium mb-1">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{item.info}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Particle styling */}
      <style jsx global>{`
                .particle {
                    position: absolute;
                    border-radius: 50%;
                    background: linear-gradient(to right, rgba(149, 76, 233, 0.5), rgba(236, 64, 122, 0.5));
                    pointer-events: none;
                }
                
                .perspective {
                    perspective: 1000px;
                }
            `}</style>
    </div>
  )
}

