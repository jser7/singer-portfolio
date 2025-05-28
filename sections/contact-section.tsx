export default function ContactSection() {
    return (
      <section className="scroll-section min-h-screen flex items-center py-20 px-4 bg-gradient-to-b from-purple-950/30 to-black">
        <div className="container mx-auto max-w-4xl">
          <div className="section-content text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Book{" "}
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                Your Event
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Ready to bring unforgettable music to your next event? Get in touch to check availability and discuss how
              Jessie can create the perfect soundtrack for your special occasion.
            </p>
          </div>
  
          <div className="relative bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-white text-sm font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-white text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="event-type" className="text-white text-sm font-medium">
                    Event Type
                  </label>
                  <select
                    id="event-type"
                    className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select event type
                    </option>
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="private">Private Party</option>
                    <option value="venue">Venue Booking</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="date" className="text-white text-sm font-medium">
                    Event Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  />
                </div>
              </div>
  
              <div className="space-y-2">
                <label htmlFor="message" className="text-white text-sm font-medium">
                  Event Details
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white resize-none"
                  placeholder="Tell me about your event, location, and any special requests..."
                ></textarea>
              </div>
  
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-medium hover:opacity-90 transition-all duration-300"
              >
                Check Availability
              </button>
            </form>
          </div>
        </div>
      </section>
    )
  }
  