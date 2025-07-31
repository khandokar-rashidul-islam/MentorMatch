import React from 'react'
import Hero from '../../components/HomeComponents/Hero'
import CategoryKeywords from '../../components/HomeComponents/CategoryKeywords'
import SearchQuery from '../../components/HomeComponents/SearchQuery'
import TutorGigs from '../../components/HomeComponents/TutorGigs'
import Features from '../../components/HomeComponents/Features'
import Benifits from '../../components/HomeComponents/Benifits'
import Stats from '../../components/HomeComponents/Stats'
import CTA from '../../components/HomeComponents/CTA'
import Footer from '../../components/HomeComponents/Footer'

const Home = () => {
  return (
    <div className="">
      <Hero />
      <CategoryKeywords />
      <SearchQuery />
      <TutorGigs/>
      <Features/>
      <Benifits/>
      <Stats/>
      <CTA/>
    </div>
  );
}

export default Home