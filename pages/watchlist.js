import Head from "next/head";
import Image from "next/image";
import { UserAuth } from "../authContext"
import { db } from "../firebase"
import { doc, updateDoc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const watchlist = () => {
  const [movies, setMovies] = useState([])
  let { user } = UserAuth()
  let router = useRouter()

  let getdata = async () => {
    onSnapshot(doc(db, "users", `${user?.email}`), doc => {
      setMovies(doc.data()?.watchlist)
    })
  }

  useEffect(() => {
    getdata()
  })

  return (
    <>
      <Head>
        <title>Disney+ | Watchlist</title>
      </Head>
      
      <div className="w-full h-full py-14 pl-16">
        <h1 className="text-5xl">Watchlist</h1>
        <h2 className="text-xl my-8">My Movies & Series</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {movies?.length > 0
          ?
          movies.map((movie, key) => (
            <div key={key} onClick={() => router.push(`/movies/${movie.id}`)} className="img shadow inline-block mr-4">
              <Image src={movie.img} layout='fill' objectFit="cover" alt="Image Row" />
            </div>
          ))
          :
          <h1 className="text-xl md:text-3xl fixed">You have no watchlist movies as of yet.</h1>
          }
        </div>
      </div>
    </>
  );
}
 
export default watchlist;