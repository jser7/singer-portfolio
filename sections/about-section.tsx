"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface TimelineEvent {
  age: number
  title: string
  description: string
  side: 'left' | 'right'
  icon: 'music' | 'trophy' | 'mic'
}

const timelineEvents: TimelineEvent[] = [
  {
    age: 4,
    title: "Piano Lessons",
    description: "My parents quickly started me on piano lessons, which I didn't enjoy at first, but it quickly became a passion I couldn't live without in my formative years.",
    side: 'left',
    icon: 'music'
  },
  {
    age: 7,
    title: "First Gig",
    description: "My song came second in a competition, and because of that I got to play an original piano piece called Nightingale at a small festival called Festival of the Arts.",
    side: 'right',
    icon: 'trophy'
  },
  {
    age: 9,
    title: "Singing Lessons",
    description: "Started formal vocal training, discovering my true passion for singing and developing my unique style.",
    side: 'left',
    icon: 'mic'
  }
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    gsap.registerPlugin(ScrollTrigger)

    if (!sectionRef.current || !timelineRef.current) return

    const timelineItems = timelineRef.current.querySelectorAll('.timeline-item')
    
    timelineItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        { 
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50 
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: item,
            start: "top bottom-=100",
            end: "top center",
            toggleActions: "play none none reverse"
          }
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const renderIcon = (icon: TimelineEvent['icon']) => {
    switch (icon) {
      case 'music':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        )
      case 'trophy':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        )
      case 'mic':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        )
    }
  }

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
            Musical Journey
          </span>
        </h2>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>

          {/* Timeline items */}
          {timelineEvents.map((event, index) => (
            <div
              key={event.age}
              className={`timeline-item relative flex ${
                event.side === 'left' ? 'justify-start' : 'justify-end'
              } mb-16 last:mb-0`}
            >
              {/* Content */}
              <div className={`w-5/12 ${event.side === 'right' && 'ml-auto'}`}>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-white/10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
                      {renderIcon(event.icon)}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{event.title}</h3>
                      <span className="text-sm text-gray-400">Age {event.age}</span>
                    </div>
                  </div>
                  <p className="text-gray-300">{event.description}</p>
                </div>
              </div>

              {/* Timeline dot */}
              <div className="absolute left-1/2 top-8 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 