import React from 'react'
import lebron_surprised from '../assets/lebron_surprised.gif'

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8 font-michroma">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-red-500">What is HeatCheck?</h1>
        <p className="text-lg leading-relaxed text-gray-300 mb-12">
        HeatCheck lets you analyze recent performance trends of NBA players with ease. Our platform currently supports data from the top 3 scorers on each team, totaling 90 players across the league. We've also developed a Machine Learning model designed to predict how many points a player is likely to score in their next game.
        </p>
        <img src={lebron_surprised} alt="Lebron surprised" className="w-1/4 mx-auto rounded-lg shadow-lg mb-12" />
        
        <p className="text-sm text-gray-600 text-center mt-6 font-serif">
          HeatCheck is intended solely for informational and analytical use. It does not offer financial advice or endorse any form of sports betting.
        </p>
      </div>
    </div>
  )
}

export default About