import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import { useEffect } from 'react'

import prey_logo from "../public/prey_logo.png"
import prey from "../public/prey.png"
import simpsons_logo from "../public/simpsons_logo.png"
import simpsons from "../public/simpsons.png"
import mike_logo from "../public/mike_logo.png"
import mike from "../public/mike.png"
import thor_logo from "../public/thor_logo.png"
import thor from "../public/thor.png"
import bear_logo from "../public/bear_logo.png"
import bear from "../public/bear.png"
import rogue_logo from "../public/rogue_logo.png"
import rogue from "../public/rogue.png"
import HeroImg from "./heroImg"

const Hero = () => {
  const INTERVAL_TIME = 6000
  let slide_x
  let counter = 0

  useEffect(() => {
    if (window.innerWidth < 750) {
      slide_x = 300
    } else {
      slide_x = 700
    }

    // setInterval(() => scrollRight(), INTERVAL_TIME)

    // return () => clearInterval(interval)
  })

  const scrollLeft = () => {
    const slider = document.getElementById('slidy')
    const numElements = slider.children.length
    const dots = document.getElementById('slidy-bar')
    
    // sliding back
    slider.scrollLeft -= slide_x
    
    // resetting
    if (counter === 0) {
      slider.scrollLeft = 10000
      dots.children[0]?.classList.replace("bg-white", "bg-gray-400")
    }
    // incrementing
    counter - 1 >= 0 ? counter -- : counter = numElements - 1
    
    dots.children[counter + 1]?.classList.replace("bg-white", "bg-gray-400")
    dots.children[counter]?.classList.replace("bg-gray-400", "bg-white")
  }
  const scrollRight = () => {
    // sliding forward
    const slider = document.getElementById('slidy')
    slider.scrollLeft += slide_x
    const dots = document.getElementById('slidy-bar')

    const numElements = slider.children.length
    // incrementing
    counter + 1 < numElements ? counter ++ : counter = 0
    // resetting
    if (counter === 0) {
      slider.scrollLeft = 0
      dots.children[numElements - 1].classList.replace("bg-white", "bg-gray-400")
    }
    
    dots.children[counter - 1]?.classList.replace("bg-white", "bg-gray-400")
    dots.children[counter]?.classList.replace("bg-gray-400", "bg-white")
  }

  return (
    <div className="w-full h-full relative">
      <div className="flex items-center relative">
        <div id="slidy" className="w-full h-full px-8 md:px-[78px] pb-10 pt-6 snap-x snap-mandatory space-x-5 whitespace-nowrap scroll-smooth overflow-x-auto scrollbar-hide">
          <HeroImg src={[simpsons_logo, simpsons ]} />
          <HeroImg src={[mike_logo, mike ]} />
          <HeroImg src={[prey_logo, prey ]} />
          <HeroImg src={[thor_logo, thor ]} />
          <HeroImg src={[bear_logo, bear ]} />
          <HeroImg src={[rogue_logo, rogue ]} />
        </div>

        {/* little balls */}
        <div id="slidy-bar" className="hidden absolute bottom-14 right-24 md:flex items-center space-x-4 z-10">
          <div className="w-[6px] h-[6px] rounded-full bg-white"></div>
          <div className="w-[6px] h-[6px] rounded-full bg-gray-400"></div>
          <div className="w-[6px] h-[6px] rounded-full bg-gray-400"></div>
          <div className="w-[6px] h-[6px] rounded-full bg-gray-400"></div>
          <div className="w-[6px] h-[6px] rounded-full bg-gray-400"></div>
          <div className="w-[6px] h-[6px] rounded-full bg-gray-400"></div>
        </div>

        {/* Left and right arrows */}
        <div onClick={scrollLeft} className="hidden md:block z-20 hover:backdrop-brightness-75 group h-full w-[5rem] absolute left-0 cursor-pointer rounded-r-2xl hover:ease-in-out duration-500">
          <AiOutlineLeft className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" size={40} />
        </div>
        <div onClick={scrollRight} className="hidden md:block z-20 hover:backdrop-brightness-75 group h-full w-[4.5rem] absolute right-0 cursor-pointer rounded-l-2xl hover:ease-in-out duration-500">
          <AiOutlineRight className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2" size={40} />
        </div>
      </div>
    </div>
  );
}
 
export default Hero;