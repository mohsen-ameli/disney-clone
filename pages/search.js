import Head from "next/head";
import { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai"
import { useRouter } from "next/router";
import Image from "next/image";
import { API_KEY } from "../components/imgList";

const Search = () => {
  const MAX_TOTAL = 20

  let inputRef = useRef()
  let router = useRouter()

  const [query, setQuery] = useState([])
  const [images, setImages] = useState([])

  const search = async (serached) => {
    if (serached !== "") {
      setQuery(serached)
      let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${serached}&page=1&include_adult=false`
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

      <div className="group flex items-center justify-center">
        <input onChange={e => search(e.target.value)} ref={inputRef} placeholder="Search by title, character, or genre" type="text" autoFocus={true}
        className="w-full h-[100px] bg-[#4b4e5a] outline-none placeholder:text-lg md:placeholder:text-[42px] text-lg md:text-5xl pl-4 md:pl-16 placeholder:pl-2 placeholder:text-[#a8a9ad]" />

        <div onClick={() => inputRef.current.value = ""} className="cursor-pointer absolute right-0 z-10 py-8 mr-4">
          <AiOutlineClose size={30} />
        </div>
      </div>

      {images.length > 0 ?
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-6 py-14 px-4 md:px-20">
          {images.map((img, key_) => (
            <div key={key_} onClick={() => router.push(`/movies/${img.id}`)} className="inline-block cursor-pointer text-[0] md:img shadow">
              <Image className="rounded-md" src={img.url} height={144} width={257} alt="Image Row" />
            </div>
          ))}
        </div>
      : (query.length !== 0) &&
        <h1 className="text-center text-xl md:text-3xl mt-28">No Results found for &quot;{query}&quot;.</h1>
      }
    </>
  );
}
 
export default Search;