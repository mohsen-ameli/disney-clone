import Image from "next/image";
import { useRouter } from "next/router";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"

const ImageRow = ({ title, images, id }) => {
  const scrollLeft = () => {
    let slider = document.getElementById('slider' + id)
    slider.scrollLeft = slider.scrollLeft - 1370
  }
  const scrollRight = () => {
    let slider = document.getElementById('slider' + id)
    slider.scrollLeft = slider.scrollLeft + 1370
  }

  return (
    <div className="">
      <h1 className='pl-4 text-xl'>{title}</h1>
      <div className="group flex items-center">
        <div id={'slider' + id} className="h-full w-full whitespace-nowrap scroll-smooth overflow-x-auto scrollbar-hide pb-8 pt-4 relative">
          {images.map((img, id) => <Img key={id} src={img.url} imgId={img.id} />)}
        </div>
        
        <div onClick={scrollLeft} className="hidden md:group-hover:flex flex-col items-center justify-center h-[25%] w-[5.5rem] md:absolute z-10 left-0 cursor-pointer">
          <AiOutlineLeft size={40} />
        </div>
        <div onClick={scrollRight} className="hidden md:group-hover:flex flex-col items-center justify-center h-[25%] w-[5.5rem] md:absolute z-10 right-0 cursor-pointer">
          <AiOutlineRight size={40} />
        </div>
      </div>
    </div>
  );
}

export const Img = ({ src, imgId }) => {
  let router = useRouter()
  
  return (
    <div onClick={() => router.push(`/movies/${imgId}`)} className="img shadow inline-block mx-4">
      <Image src={src} layout='fill' objectFit="cover" alt="Image Row" />
    </div>
  )
}
 
export default ImageRow;