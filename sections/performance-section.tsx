export default function PerformanceSection() {
    return (
      <section className="scroll-section min-h-screen flex items-center py-20 px-4 bg-gradient-to-b from-black to-purple-950/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="section-content order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Live</span>{" "}
                Performances
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                From intimate acoustic sets to full band performances, Jessie brings passion and energy to every stage.
                Each show is crafted to create an unforgettable experience that resonates with audiences.
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
                  <span>Versatile vocal range and style</span>
                </li>
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
                  <span>Engaging stage presence</span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="w-full max-w-md aspect-square rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 p-1">
                <div className="relative w-full h-full rounded-xl bg-black/40 backdrop-blur-sm flex items-center justify-center">
                  <img
                    src='/images/jessie2.jpeg'
                    alt="Jessie performing on stage"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  