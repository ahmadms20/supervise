import React , {useState} from 'react'
import './App.css';
import Dropdown from './components/Dropdown';
import Hero from './pages/Hero';
import Navbar from './components/Navbar'
import BenefitSection from './pages/BenefitSection';
import AboutSection from './pages/AboutSection';
import FeaturesSection from './pages/FeaturesSection';
import Footer from './pages/Footer';

function Landingpage() {
  const [isOpen,setIsOpen] = useState(false)

  const toogle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
    <Navbar toogle={toogle}/>
    <Dropdown isOpen={isOpen} toogle={toogle} />
    <Hero id='homes' />
    <BenefitSection />
    <AboutSection id='about' />
    <FeaturesSection />
    <Footer />
    </>
  );
}

export default Landingpage;
