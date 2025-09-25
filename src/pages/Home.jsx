import React from 'react'
import Navbar from '../components/Navbar/Navbar.jsx'
import Hero from '../components/Home/Hero.jsx'
import Testimonial from '../components/Home/Testimonial.jsx'
import AiTools from '../components/Home/AiTools.jsx'
import Plan from '../components/Home/Plan.jsx'
import Footer from '../components/Home/Footer.jsx'
import VoiceToText from '../components/VoiceToText.jsx'

const Home = () => {
  return (
    <div className='w-full h-full'>
      <Navbar />
      <Hero />
      <AiTools />
      <Testimonial />
      <Plan />
      <Footer />
    </div>
  )
}

export default Home