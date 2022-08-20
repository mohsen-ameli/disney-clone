import Head from "next/head";
import { useRef, useState } from "react";
import { Img } from "../components/ImageRow";
import { API_KEY } from ".";
import { AiOutlineClose } from "react-icons/ai"
import { useRouter } from "next/router";
import Image from "next/image";

const Search = () => {
  const MAX_TOTAL = 20

  let inputRef = useRef()
  let router = useRouter()

  const [images, setImages] = useState([])

  const search = async (query) => {
    if (query !== "") {
      let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
      let res = await fetch(url)
      let data = await res?.json()
  
      let urls = []
      for (let i = 0; i < MAX_TOTAL; i++) {
        let url = `https://image.tmdb.org/t/p/w500${data?.results[i]?.backdrop_path}`
        data?.results[i]?.backdrop_path && urls.push({url: url, id: data.results[i].id})
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
          <input onChange={e => search(e.target.value)} ref={inputRef} placeholder="Search by title, character, or genre" type="text"
          className="w-full h-[100px] bg-[#4b4e5a] outline-none placeholder:text-lg md:placeholder:text-5xl text-lg md:text-5xl pl-4 md:pl-24 placeholder:pl-4 placeholder:text-gray-400" />

          <div onClick={() => inputRef.current.value = ""} className="cursor-pointer absolute right-0 z-10 py-8 mr-4">
            <AiOutlineClose size={30} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 py-14 px-4 md:px-20">
          {images.length > 0
          ?
          images.map((img, key_) => (
            <div key={key_} onClick={() => router.push(`/movies/${img.id}`)} className="img shadow inline-block mx-4">
              <Image src={img.url} layout='fill' objectFit="cover" alt="Image Row" />
            </div>
          ))
          :
          <h1 className="text-xl md:text-3xl fixed">No Results were found.</h1>
          }
        </div>
      </div>
    </>
  );
}
 
export default Search;