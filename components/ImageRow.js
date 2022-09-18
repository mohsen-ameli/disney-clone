import Image from "next/image";
import { useRouter } from "next/router";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"

const ImageRow = ({ title, images, id }) => {
  const scrollLeft = () => {
    const slider = document.getElementById('slider' + id)
    slider.scrollLeft -= 1400
  }
  const scrollRight = () => {
    const slider = document.getElementById('slider' + id)
    slider.scrollLeft += 1400
  }

  return (
    <div className="w-full h-full">
      {/* title */}
      <h1 className='pl-4 md:pl-[78px] text-xl'>
        { title }
      </h1>

      <div className="flex items-center relative">
        {/* Image row */}
        <div id={'slider' + id} className="w-full h-full px-4 md:px-[78px] snap-x snap-mandatory space-x-5 pb-10 pt-3 whitespace-nowrap scroll-smooth overflow-x-auto scrollbar-hide">
          {images.map((img, id) => <Img key={id} src={img.url} imgId={img.id} />)}
        </div>
        
        {/* Left and right arrows */}
        <div onClick={scrollLeft} className="z-20 hover:backdrop-brightness-75 group h-full w-[5rem] absolute left-0 mb-8 cursor-pointer rounded-r-md hover:ease-in-out duration-500">
          <AiOutlineLeft className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" size={40} />
        </div>
        <div onClick={scrollRight} className="z-20 hover:backdrop-brightness-75 group h-full w-[4.5rem] absolute right-0 mb-8 cursor-pointer rounded-l-md hover:ease-in-out duration-500">
          <AiOutlineRight className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2" size={40} />
        </div>
      </div>
    </div>
  );
}

export const Img = ({ src, imgId }) => {
  let router = useRouter()
  
  return (
    <div onClick={() => router.push(`/movies/${imgId}`)} className="snap-center img shadow inline-block">
      <Image src={src} layout='fill' objectFit="cover" alt="Image Row" />
    </div>
  )
}
 
export default ImageRow;