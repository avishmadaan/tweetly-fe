import React from 'react'

const AiSearch = () => {
  return (
    <div className="flex flex-col items-center justify-center   px-4">
        
    <h1 className="text-4xl font-bold mb-4">Coming Soon</h1>
    <p className="text-lg text-gray-700 dark:text-white mb-8 text-center max-w-md">
      We are working on something great. Please check back later.
    </p>

    <div className="w-full max-w-md">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-3 pl-4 pr-12 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            <button type="submit" className="text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    
  </div>
  )
}

export default AiSearch
