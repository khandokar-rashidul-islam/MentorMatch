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
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "next-themes";
const Home = () => {
  const [init, setInit] = useState(false);
  const { theme } = useTheme()

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <div className="relative">
      <div className="fixed inset-0 -z-8 ">
        <Particles
          id="tsparticles"
          init={init}
          options={{
            background: {
              // 
            },
            fpsLimit: 60,
            interactivity: {

            },
            particles: {
              number: {
                value: 120, // how many stars
                density: {
                  enable: true,
                  area: 800,
                },
              },
              color: { value: theme === "dark" ? "#36b1e5" : "#076086" }, // star color
              shape: { type: "circle" },
              opacity: {
                value: 0.8,
                random: true,
                animation: {
                  enable: true,
                  speed: 0.5,
                  minimumValue: 0.2,
                },
              },
              size: {
                value: { min: 1, max: 3 }, // random star sizes
              },
              move: {
                enable: true,
                speed: 1, // slow drift like stars
                direction: "none",
                random: true,
                straight: false,
                outModes: {
                  default: "out",
                },
              },
            },
            detectRetina: true,
          }}
        />
      </div>
      <Hero />
      <div className='w-11/12 mx-auto'>
        <CategoryKeywords />
      </div>
      <SearchQuery />
      <TutorGigs />
      <Features />
      <Benifits />
      <Stats />
      <CTA />
    </div>
  );
}

export default Home