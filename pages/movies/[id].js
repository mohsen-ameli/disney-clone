import Image from "next/image";
import { useRouter } from 'next/router'
import { BsFillPlayFill, BsCheck2 } from 'react-icons/bs'
import { HiPlusSm } from 'react-icons/hi'
import { MdGroups } from 'react-icons/md'
import { db } from "../../firebase"
import { UserAuth } from "../../authContext"
import { arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'

import useSWR from 'swr'
import { useEffect, useState } from "react";
import Head from "next/head";
import { API_KEY } from "../../components/imgList";
import ImageRow from "../../components/ImageRow";

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const Detail = () => {
  const router = useRouter()
  const { id } = router.query
  const { user } = UserAuth()
  const [saved, setSaved] = useState(false)
  const [page, setPage] = useState("suggested")

  const getdata = async () => {
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
  }, [])

  const { data: d1, error: e1 } = useSWR(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`, fetcher)
  const { data: d2, error: e2 } = useSWR(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`, fetcher)
  const { data: d3, error: e3 } = useSWR(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`, fetcher)

  let similar = []
  similar.push(d3?.results?.map(movie => {
    let url = `https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`
    return {url, id: movie?.id}
  }))

  let movie = {
    url: `https://image.tmdb.org/t/p/original${d1?.backdrop_path}`,
    name: d1?.title,
    details: d1?.overview,
    genres: d1?.genres.slice(0, 3),
    date: d1?.release_date,
    duration: d1?.runtime,
    director: d2?.crew?.filter(({job})=> job ==='Director')[0].name,
    starring: d2?.cast?.slice(0, 6),
    similar: similar[0]
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

  if (!d1 || !d1) return <div>Loading...</div>
  if (e1 || e2) return <div>An error happened</div>

  return (
    <>
      <Head>
        <title>Disney+ | {movie?.name}</title>
      </Head>

      <div className="fixed top-0 -z-10 w-full h-screen bg-gradient-to-r from-gray-900 to-transparent"></div>
      <div className="-z-20 fixed top-0 bg-fixed h-screen w-full">
        <Image src={movie.url} layout="fill" objectFit="cover" objectPosition="top" alt="image"></Image>
      </div>

      <div className="w-full h-full mt-24 z-10">
        <div className="max-w-[1400px] mx-auto py-16 px-4">
          <h1 className="text-4xl">{ movie?.name }</h1>

          <div className="flex md:flex-row flex-col md:items-center space-y-5 md:space-x-5 mt-8 mb-4">
            <div className="flex space-x-5">
              <button className="py-3 px-8 flex items-center uppercase rounded-md bg-white text-black hover:bg-gray-300 hover:ease-in-out duration-200">
                <BsFillPlayFill size={35} /> Play
              </button>
              <button className="py-5 px-8 flex items-center uppercase rounded-md bg-black text-white border border-white hover:bg-white hover:text-black hover:ease-in-out duration-200">
                Trailer
              </button>
            </div>
            <div className="flex pb-4 space-x-5">
              {/* Watchlist */}
              {!saved ?
                <button onClick={() => addToWatchlist()} className="p-2 bg-black border-2 border-white rounded-full hover:text-black hover:bg-white hover:ease-in-out duration-200">
                  <HiPlusSm size={28} />
                </button>
              :
                <button onClick={() => setSaved(false)} className="p-2 bg-black border-2 border-white rounded-full hover:text-black hover:bg-white hover:ease-in-out duration-200">
                  <BsCheck2 className="text-[#0083ef]" size={28} />
                </button>
              }
              {/* Group Watch */}
              <button className="p-2 bg-black border-2 border-white rounded-full hover:text-black hover:bg-white hover:ease-in-out duration-200">
                <MdGroups size={28} />
              </button>
            </div>
          </div>

          <div className="flex space-x-2 mb-8 font-light text-sm md:text-md">
            <p> {movie?.date?.split('-')[0]}</p>
            <p>•</p>
            <p>
              {Math.floor(movie?.duration / 60)}h {movie?.duration % 60 > 0 && movie.duration % 60 + "m"}
            </p>
            <p>•</p>
            <p className="flex space-x-2">
              {movie?.genres?.map((genre, id) => (
                <p key={id}>{genre.name + (id !== movie.genres.length - 1 ? "," : "")}</p>
              ))}
            </p>
          </div>

          <p className="text-md font-semibold leading-7 md:text-xl max-w-[800px]">{ movie?.details }</p>
        </div>
      </div>

      {/* suggested and details */}
      <div className="w-full h-full pb-16">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-center space-x-8 mb-3 mt-3 border-b-2 border-gray-600 text-xl">
            <button
              onClick={() => setPage("suggested")}
              className={(page === "suggested" ? "border-white text-white hover:border-gray-300" : "border-transparent text-gray-300 hover:text-white hover:border-white") + " uppercase pb-3 border-b-2 hover:ease-linear duration-200"}>
              suggested
            </button>
            <button
              onClick={() => setPage("details")}
              className={(page === "details" ? "border-white text-white hover:border-gray-300" : "border-transparent text-gray-300 hover:text-white hover:border-white") + " uppercase pb-3 border-b-2 hover:ease-linear duration-200"}>
              details
            </button>
          </div>
          {/* Details */}
          {page === "details" && <Details movie={movie} />}
        </div>
        {/* Suggested */}
        {page === "suggested" && <ImageRow images={similar[0]} />}
      </div>
    </>
  );
}

const Details = ({ movie }) => {
  return (
    <div className="grid md:grid-cols-4 gap-4">
      {/* Description */}
      <div className="flex flex-col col-span-2">
        <h1 className="text-3xl mb-4">{movie?.name}</h1>
        <p className="text-lg font-thin leading-8 max-w-[800px]">{ movie?.details }</p>
      </div>

      {/* Movie etails */}
      <div className="flex flex-col space-y-6">
        <div className="space-y-1 font-thin">
          <h1 className="text-gray-300">Duration: </h1>
          <h1 className="text-white">{Math.floor(movie?.duration / 60)}h {movie?.duration % 60 > 0 && movie.duration % 60 + "m"}</h1>
        </div>
        <div className="space-y-1 font-thin">
          <h1 className="text-gray-300">Release date: </h1>
          <h1 className="text-white">{movie?.date?.split('-')[0]}</h1>
        </div>
        <div className="space-y-1 font-thin">
          <h1 className="text-gray-300">Genres: </h1>
          <h1 className="text-white">{movie?.genres?.map((genre, id) => genre.name + (id !== movie.genres.length - 1 ? ", " : ""))}</h1>
        </div>
      </div>

      {/* Actors details */}
      <div className="flex flex-col space-y-6">
        <div className="space-y-1 font-thin">
          <h1 className="text-gray-300">Director: </h1>
          <h1 className="text-white">{movie?.director}</h1>
        </div>
        <div className="space-y-1 font-thin">
          <h1 className="text-gray-300">Starring: </h1>
          {movie?.starring?.map((actor, i) => (
            <h1 key={i} className="text-white">
              {actor.name}
            </h1>
          ))}
        </div>
      </div>
    </div>
  )
}
 
export default Detail;