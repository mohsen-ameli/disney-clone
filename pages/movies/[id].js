import Image from "next/image";
import { useRouter } from 'next/router'
import { API_KEY } from "..";
import { BsFillPlayFill } from 'react-icons/bs'
import { HiPlusSm } from 'react-icons/hi'
import { MdGroups } from 'react-icons/md'

import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const Detail = () => {
  const router = useRouter()
  const { id } = router.query

  const { data, error } = useSWR(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`, fetcher)

  if (!data) return <div>Loading...</div>
  if (error) return <div>An error happened</div>

  let movie = {
    url: `https://image.tmdb.org/t/p/original${data?.backdrop_path}`,
    name: data?.title,
    details: data?.overview,
    genres: data?.genres
  }

  return (
    <>
      <div className="-z-10 fixed w-full h-screen bg-gradient-to-r from-gray-900 to-transparent"></div>
      <div className="fixed w-full h-screen -z-20">
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
            <button className="mx-6 p-2 bg-black border-2 border-white rounded-full hover:text-black hover:bg-white hover:ease-in-out duration-200">
              <HiPlusSm size={28} />
            </button>
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