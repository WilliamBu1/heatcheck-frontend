import React from 'react'
import lebron_surprised from '../assets/lebron_surprised.gif'

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8 font-michroma">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-red-500">What is HeatCheck?</h1>
        <p className="text-lg leading-relaxed text-gray-300 mb-12">
          HeatCheck allows you to analyze a NBA player's recent performance! 
          We currently only support data from the top 3 players from each team. 
          This results in a total of 90 players in our system. 
          We also developed a Machine Learning model to assist in predicting how many 
          points a player will score in their next game!
        </p>
        <img src={lebron_surprised} alt="Lebron surprised" className="w-1/4 mx-auto rounded-lg shadow-lg" />
      </div>
    </div>
  )
}

export default About