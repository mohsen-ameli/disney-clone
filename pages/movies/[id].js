import Image from "next/image";
import { useRouter } from 'next/router'
import { API_KEY } from "..";
import { BsFillPlayFill, BsCheck2 } from 'react-icons/bs'
import { HiPlusSm } from 'react-icons/hi'
import { MdGroups } from 'react-icons/md'
import { db } from "../../firebase"
import { UserAuth } from "../../authContext"
import { arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'

import useSWR from 'swr'
import { useEffect, useState } from "react";
import Head from "next/head";

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const Detail = () => {
  const router = useRouter()
  const { id } = router.query
  const { user } = UserAuth()

  const [saved, setSaved] = useState(false)

  const { data, error } = useSWR(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`, fetcher)

  let getdata = async () => {
    onSnapshot(doc(db, "users", `${user?.email}`), doc => {
      doc.data()?.watchlist.map(movie => {
        if (movie.id === id) {
          setSaved(true)
        }
      })
    })
  }

  useEffect(() => {
    getdata()
  })

  if (!data) return <div>Loading...</div>
  if (error) return <div>An error happened</div>

  let movie = {
    url: `https://image.tmdb.org/t/p/original${data?.backdrop_path}`,
    name: data?.title,
    details: data?.overview,
    genres: data?.genres
  }

  let addToWatchlist = async () => {
    if (user) {
      setSaved(!saved)
      await updateDoc(doc(db, 'users', `${user?.email}`), {
        watchlist: arrayUnion({
          id: id,
          name: movie.name,
          img: movie.url
        })
      })
    } else {
      alert("You need to be logged in")
    }
  }

  return (
    <>
      <Head>
        <title>Disney+ | {movie?.name}</title>
      </Head>

      <div className="absolute top-0 -z-10 w-full h-screen bg-gradient-to-r from-gray-900 to-transparent"></div>
      <div className="bg-fixed -z-20">
        <Image className="-z-20 w-full h-screen object-cover object-right-top" src={movie.url} layout="fill" alt=""></Image>
      </div>

      <div className="w-full max-h-screen">
        <div className="max-w-[1400px] mx-auto py-16 px-4 z-10">
          <h1 className="text-4xl">{ movie?.name }</h1>
          <h2>{ movie?.genres?.length > 0 && movie.genres[0].name }</h2>

          <div className="flex items-center my-8">
            <button className="py-3 px-8 flex items-center uppercase rounded-md bg-white text-black hover:bg-gray-300 hover:ease-in-out duration-150">
              <BsFillPlayFill size={35} /> Play
            </button>
            {!saved ?
            <button onClick={() => addToWatchlist()} className="mx-6 p-2 bg-black border-2 border-white rounded-full hover:text-black hover:bg-white hover:ease-in-out duration-200">
              <HiPlusSm size={28} />
            </button>
            :
              <button onClick={() => setSaved(false)} className="mx-6 p-2 bg-black border-2 border-white rounded-full hover:text-black hover:bg-white hover:ease-in-out duration-200">
                <BsCheck2 className="text-[#0083ef]" size={28} />
              </button>
            }
            <button className="p-2 bg-black border-2 border-white rounded-full hover:text-black hover:bg-white hover:ease-in-out duration-200">
              <MdGroups size={28} />
            </button>
          </div>

          <p className="text-xl max-w-[800px]">{ movie?.details }</p>
        </div>
      </div>
    </>
  );
}
 
export default Detail;