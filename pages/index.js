import Head from 'next/head'
import Image from 'next/image'
import ImageRow from '../components/ImageRow'
import RowBig from '../components/RowBig'

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
    popularUrls.push(url)

    let url2 = `https://image.tmdb.org/t/p/w500${upcoming[rand[i]].backdrop_path}`
    upcomingUrls.push(url2)

    let url3 = `https://image.tmdb.org/t/p/w500${top[rand[i]].backdrop_path}`
    topUrls.push(url3)
  }

  return (
    <div className=''>
      <Head>
        <title>Disney+ | Home</title>
      </Head>

      <RowBig />

      <div className="max-w-[1400px] mx-auto p-8">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          <Video name="disney" />
          <Video name="pixar" />
          <Video name="marvel" />
          <Video name="starwars" />
          <Video name="geo" />
          <Video name="star" />
        </div>
      </div>

      <div className="max-w-[1370px] mx-auto">
        <ImageRow id="1" title="Recommended For You" images={popularUrls} />
        <ImageRow id="2" title="Coming To Disney+" images={upcomingUrls} />
        <ImageRow id="3"  title="Top Movies" images={topUrls} />
      </div>
    </div>
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