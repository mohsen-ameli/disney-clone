import Head from 'next/head'
import Image from 'next/image'
import Hero from '../components/hero'
import ImageRow from '../components/ImageRow'
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
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
import { useEffect } from 'react'

export const API_KEY = "90b74264545d996ccf2093b0ef1459a7"
export const ROW_NUM = 15

export const getStaticProps = async () => {
  let res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
  let popular = await res.json()

  let res2 = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`)
  let upcoming = await res2.json()

  let res3 = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`)
  let top = await res3.json()

  return {
    props: {popular: popular.results, upcoming: upcoming.results, top: top.results}
  }
}

export default function Home({ popular, upcoming, top }) {
  const INTERVAL_TIME = 6000
  const SLIDE_AMOUNT = 1400
  let popularUrls = []
  let upcomingUrls = []
  let topUrls = []
  let rand = []

  while(rand.length < ROW_NUM){
    let r = Math.floor(Math.random() * 19) + 1
    if(rand.indexOf(r) === -1) rand.push(r)
  }

  for (let i = 0; i < ROW_NUM; i++) {
    let url = `https://image.tmdb.org/t/p/w500${popular[rand[i]].backdrop_path}`
    popularUrls.push({url: url, id: popular[rand[i]].id})

    let url2 = `https://image.tmdb.org/t/p/w500${upcoming[rand[i]].backdrop_path}`
    upcomingUrls.push({url: url2, id: upcoming[rand[i]].id})

    let url3 = `https://image.tmdb.org/t/p/w500${top[rand[i]].backdrop_path}`
    topUrls.push({url: url3, id: top[rand[i]].id})
  }

  useEffect(() => {
    const interval = setInterval(() => scrollRight(), INTERVAL_TIME)

    return () => clearInterval(interval)
  })

  let counter = 0
  const scrollLeft = () => {
    const slider = document.getElementById('slidy')
    const numElements = slider.children.length
    const dots = document.getElementById('slidy-bar')
    
    // sliding back
    slider.scrollLeft -= SLIDE_AMOUNT
    
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
    slider.scrollLeft += SLIDE_AMOUNT
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
    <>
      <Head>
        <title>Disney+ | Home</title>
      </Head>

      {/* Big Picture */}
      <div className="w-full h-full">
        <div className="flex items-center relative">
          <div id="slidy" className="w-full h-full px-[78px] pb-10 pt-6 snap-x snap-mandatory space-x-5 whitespace-nowrap scroll-smooth overflow-x-auto scrollbar-hide">
            <Hero src={[simpsons_logo, simpsons ]} />
            <Hero src={[mike_logo, mike ]} />
            <Hero src={[prey_logo, prey ]} />
            <Hero src={[thor_logo, thor ]} />
            <Hero src={[bear_logo, bear ]} />
            <Hero src={[rogue_logo, rogue ]} />
          </div>
          <div id="slidy-bar" className="absolute bottom-14 right-24 flex items-center space-x-4 z-10">
            <div className="w-[6px] h-[6px] rounded-full bg-white"></div>
            <div className="w-[6px] h-[6px] rounded-full bg-gray-400"></div>
            <div className="w-[6px] h-[6px] rounded-full bg-gray-400"></div>
            <div className="w-[6px] h-[6px] rounded-full bg-gray-400"></div>
            <div className="w-[6px] h-[6px] rounded-full bg-gray-400"></div>
            <div className="w-[6px] h-[6px] rounded-full bg-gray-400"></div>
          </div>
          
          {/* Left and right arrows */}
          <div onClick={scrollLeft} className="z-20 hover:backdrop-brightness-75 group h-full w-[5rem] md:absolute left-0 cursor-pointer rounded-r-2xl hover:ease-in-out duration-500">
            <AiOutlineLeft className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" size={40} />
          </div>
          <div onClick={scrollRight} className="z-20 hover:backdrop-brightness-75 group h-full w-[4.5rem] md:absolute right-0 cursor-pointer rounded-l-2xl hover:ease-in-out duration-500">
            <AiOutlineRight className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2" size={40} />
          </div>
        </div>
      </div>

      {/* Videos */}
      <div className="max-w-[1400px] mx-auto pb-6 pt-1 px-4">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-5">
          <Video name="disney" />
          <Video name="pixar" />
          <Video name="marvel" />
          <Video name="starwars" />
          <Video name="geo" />
          <Video name="star" />
        </div>
      </div>

      {/* All other image rows */}
      <div>
        <ImageRow id="1" title="Recommended For You" images={popularUrls} />
        <ImageRow id="2" title="Coming To Disney+" images={upcomingUrls} />
        <ImageRow id="3" title="Top Movies" images={topUrls} />
        <ImageRow id="4" title="Animated Movies" images={popularUrls} />
        <ImageRow id="5" title="Trending" images={upcomingUrls} />
      </div>
    </>
  )
}

const Video = ({ name }) => {
  return (
    <div className="group shadow cursor-pointer bg-gradient-to-b from-[#3a3c4a] to-[#242632] border-[3px] rounded-lg hover:scale-105 hover:ease-out duration-300 border-[#434550] hover:border-[#b1b1b3] relative flex items-center justify-center">
      <Image className='self-center' src={`/${name}.png`} layout='fill' objectFit="cover" alt="image"></Image>
      <video className='rounded-lg invisible group-hover:visible' autoPlay={true} muted={true} loop={true}>
        <source src={`/${name}.mp4`} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
    </div>
  )
}