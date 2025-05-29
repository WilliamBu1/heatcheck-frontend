import React from 'react'

const predict_page = () => {
  return (
    <div className="min-h-screen bg-black text-white p-4 font-michroma flex flex-col items-center justify-center">
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 max-w-2xl w-full shadow-lg transform hover:shadow-red-900/20 transition-all duration-500">
        
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-center text-white mb-2">
            Coming Soon
          </h2>
          <p className="text-center text-gray-400 text-lg">
            Our advanced prediction engine will be available for the next NBA season
          </p>
        </div>
        
        <div className="text-gray-500 text-center text-sm">
          We're working hard to bring you the most accurate player performance predictions
        </div>
      </div>
    </div>
  )
}

export default predict_page