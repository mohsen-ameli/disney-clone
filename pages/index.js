import Head from 'next/head'
import Hero from '../components/hero'
import ImgList from '../components/imgList'
import Video from '../components/video'

export default function Home() {
  return (
    <>
      <Head>
        <title>Disney+ | Home</title>
      </Head>

      {/* Big Pictures (Hero) */}
      <Hero />

      {/* Videos */}
      <Video />

      {/* All other image rows */}
      <ImgList />
    </>
  )
}