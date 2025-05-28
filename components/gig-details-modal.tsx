"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { X } from "lucide-react"

export default function GigDetailsModal({ gig, onClose }) {
  const modalRef = useRef(null)
  const contentRef = useRef(null)

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
    const handleEscape = (e) => {
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

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-500/80 dark:bg-black/80 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 p-4 flex justify-between items-center border-b border-gray-300 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
          <h3 className="text-xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              {gig.venue}
            </span>{" "}
            Details
          </h3>
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Header info */}
          <div className="mb-8 pb-6 border-b border-gray-300 dark:border-gray-800">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{gig.venue}</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {gig.date} • {gig.location}
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${gig.color} text-white font-medium`}>
                  Past Event
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300">{gig.description}</p>
          </div>

          {/* Setlist */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Setlist</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {gig.details.setlist.map((song, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <span>{song}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Musicians */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Musicians</h3>
            <ul className="space-y-2">
              {gig.details.musicians.map((musician, index) => (
                <li key={index} className="text-gray-600 dark:text-gray-300">
                  {musician}
                </li>
              ))}
            </ul>
          </div>

          {/* Notes */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Notes</h3>
            <p className="text-gray-600 dark:text-gray-300">{gig.details.notes}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

