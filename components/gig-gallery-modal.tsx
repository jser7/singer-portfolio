"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { X } from "lucide-react"

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

interface GigGalleryModalProps {
  gig: Gig
  onClose: () => void
}

export default function GigGalleryModal({ gig, onClose }: GigGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden"

    // Animate modal opening
    const tl = gsap.timeline()

    tl.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" })

    tl.fromTo(
      contentRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
      "-=0.1",
    )

    // Add event listener for escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleEscape)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleEscape)
    }
  }, [onClose])

  // Handle closing animation
  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: onClose,
    })

    tl.to(contentRef.current, { y: 50, opacity: 0, duration: 0.3, ease: "power2.in" })

    tl.to(modalRef.current, { opacity: 0, duration: 0.2, ease: "power2.in" }, "-=0.1")
  }

  // Navigate to next image
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % gig.gallery.length)
  }

  // Navigate to previous image
  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + gig.gallery.length) % gig.gallery.length)
  }

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-500/80 dark:bg-black/80 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b border-gray-300 dark:border-gray-800">
          <h3 className="text-xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              {gig.venue}
            </span>{" "}
            Gallery
          </h3>
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Gallery */}
        <div className="relative flex-grow overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={gig.gallery[currentIndex] || "/placeholder.svg"}
              alt={`${gig.venue} performance ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-300 dark:border-gray-800 flex justify-between items-center">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {currentIndex + 1} of {gig.gallery.length}
          </div>
          <div className="text-sm">
            {gig.date} • {gig.location}
          </div>
        </div>
      </div>
    </div>
  )
}

