export default function RecordingSection() {
    return (
      <section className="scroll-section z-50 min-h-screen flex items-center py-20 px-4 bg-gradient-to-b from-purple-950/30 to-black">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div className="w-full max-w-md aspect-square rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-purple-500/30 p-1">
                <div className="relative w-full h-full rounded-xl bg-black/40 backdrop-blur-sm flex items-center justify-center">
                  <img
                    src='/images/jessie3.jpeg'
                    alt="Jessie in recording studio"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
            <div className="section-content">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Studio</span>{" "}
                Recording
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Capturing the perfect sound in the studio is an art form. Jessie brings technical precision and emotional
                depth to every recording session, creating tracks that move and inspire.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-500 mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Original music and covers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  