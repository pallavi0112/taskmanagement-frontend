import React, { useEffect, useState } from 'react'
import Header from '../component/Herosection/Header'
import HeroSection from '../component/Herosection/HeroSection'
import TokenNotification from '../CheckToken/TokenNotification'
const Home = () => {
  return (
    <>
        <TokenNotification/> 
        <Header/>
        <HeroSection/>
    </>
  )
}

export default Home