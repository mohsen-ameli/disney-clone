import Head from "next/head";
import Image from "next/image";
import { UserAuth } from "../authContext"
import { db } from "../firebase"
import { doc, updateDoc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Watchlist = () => {
  const [movies, setMovies] = useState([])
  let { user } = UserAuth()
  let router = useRouter()

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), doc => {
      setMovies(doc.data()?.watchlist)
    })
  })

  return (
    <>
      <Head>
        <title>Disney+ | Watchlist</title>
      </Head>
      
      <div className="w-full h-full py-12 px-8 md:px-20 mb-[13.8rem]">
        <h1 className="text-5xl">Watchlist</h1>
        <h2 className="text-xl mt-6 mb-4">My Movies & Series</h2>
        {movies?.length > 0 ? movies.map((movie, key) => (
          <div key={key} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-6">
            <div
              onClick={() => router.push(`/movies/${movie.id}`)}
              className="inline-block cursor-pointer md:img mr-auto text-[0]"
            >
              <Image
                className="rounded-md"
                src={movie.img}
                height={144}
                width={257}
                alt="Image Row"
              />
            </div>
          </div>
        )) :
          <h1 className="text-xl md:text-3xl">You have no watchlist movies as of yet.</h1>
        }
      </div>
    </>
  );
}
 
export default Watchlist;