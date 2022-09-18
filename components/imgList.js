import { useEffect, useState } from "react";
import ImageRow from "./ImageRow";

export const API_KEY = process.env.API_KEY_THEMOVIEDB
export const ROW_NUM = 5

const ImgList = () => {
  let [popularUrls, setPopularUrls] = useState([])
  let [upcomingUrls, setUpcomingUrls] = useState([])
  let [topUrls, setTopUrls] = useState([])

  const getStuff = async () => {
    let res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
    let popular = await res.json()
  
    let res2 = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`)
    let upcoming = await res2.json()
  
    let res3 = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`)
    let top = await res3.json()
  
    putStuff({popular: popular.results, upcoming: upcoming.results, top: top.results})
  }

  const putStuff = ({ popular, upcoming, top }) => {
    let rand = []
    while(rand.length < ROW_NUM){
      let r = Math.floor(Math.random() * 19) + 1
      if(rand.indexOf(r) === -1) rand.push(r)
    }

    for (let i = 0; i < ROW_NUM; i++) {
      let url = `https://image.tmdb.org/t/p/w500${popular[rand[i]].backdrop_path}`
      setPopularUrls(old => [...old, {url: url, id: popular[rand[i]].id}])

      let url2 = `https://image.tmdb.org/t/p/w500${upcoming[rand[i]].backdrop_path}`
      setUpcomingUrls(old => [...old, {url: url2, id: upcoming[rand[i]].id}])

      let url3 = `https://image.tmdb.org/t/p/w500${top[rand[i]].backdrop_path}`
      setTopUrls(old => [...old, {url: url3, id: top[rand[i]].id}])
    }
  }

  useEffect(() => {
    getStuff()
  }, [])

  return (
    <>
      <ImageRow id="1" title="Recommended For You" images={popularUrls} />
      <ImageRow id="2" title="Coming To Disney+" images={upcomingUrls} />
      <ImageRow id="3" title="Top Movies" images={topUrls} />
      <ImageRow id="4" title="Animated Movies" images={popularUrls} />
      <ImageRow id="5" title="Trending" images={upcomingUrls} />
    </>
  );
}
 
export default ImgList;