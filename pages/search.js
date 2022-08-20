import Head from "next/head";
import { useRef, useState } from "react";
import { Img } from "../components/ImageRow";
import { API_KEY } from ".";
import { AiOutlineClose } from "react-icons/ai"

const Search = () => {
  const MAX_TOTAL = 20

  const [images, setImages] = useState([])

  const search = async (query) => {
    if (query !== "") {
      let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
      let res = await fetch(url)
      let data = await res?.json()
  
      let urls = []
      for (let i = 0; i < MAX_TOTAL; i++) {
        let url = `https://image.tmdb.org/t/p/w500${data?.results[i]?.backdrop_path}`
        data?.results[i]?.backdrop_path && urls.push(url)
      }
  
      setImages(urls)
    }
  }

  return (
    <>
      <Head>
        <title>Search movies and shows</title>
      </Head>

      <div className="">
        <div className="group flex items-center justify-center">
          <input onChange={e => search(e.target.value)} className="w-full h-[100px] bg-[#4b4e5a] outline-none placeholder:text-5xl text-5xl pl-24 placeholder:pl-4 placeholder:text-gray-400" placeholder="Search by title, character, or genre" type="text" />

          <div className="hidden group-focus-within:block absolute right-0 z-10 p-8">
            <AiOutlineClose size={30} />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4 py-14 px-20">
          {images.length > 0
          ?
          images.map((img, id) => (
            <Img key={id} name={img} />
          ))
          :
          <h1 className="text-3xl fixed">No Results were found.</h1>
          }
        </div>
      </div>
    </>
  );
}
 
export default Search;