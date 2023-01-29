import { useState } from 'react'
import { Download, Features, FeaturesCopy ,SectionWrapper,Navbar, Footer , Intro} from '../components';
import assets from '../assets';
import styles from '../styles/Global';

const Home = () => {
  return (
    <>

      <div className="gradient-bg-welcome">
        <Navbar />
        <Intro />
      </div>
      <Features />
      <SectionWrapper 
        title="Support top projects"
        description="Certified projects on different areas, with the best ROI for you and the planet."
        showBtn
        reverse
      />
        <SectionWrapper 
        title="Discover collections!"
        description="A new way for creators to support initiatives against climate change, allowing clients to get the most exclusive art-works. Check our latest collections."
        banner="banner02"
      />

      <SectionWrapper 
        title="API"
        description="Improve value to your customers by integrating our offsetting API into your platform."
        reverse
        mockupImg="home_cards.png"
        
      />
      <div className="gradient-bg-welcome">
        <FeaturesCopy />
        <Footer />
        </div>
    </>
  )
}

export default Home
