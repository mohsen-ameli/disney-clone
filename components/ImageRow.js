import Image from "next/image";
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai"

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
      <h1 className='pl-4 text-xl font-bold'>{title}</h1>
      <div className="group flex items-center">
        <div onClick={scrollLeft} className="hidden group-hover:flex flex-col items-center justify-center h-[25%] w-[5.5rem] absolute z-10 left-0 cursor-pointer">
          <AiOutlineLeft size={40} />
        </div>
        <div id={'slider' + id} className="h-full w-full whitespace-nowrap scroll-smooth overflow-x-scroll scrollbar-hide pb-8 pt-4 relative">
          {images.map((img, id) => <Img key={id} name={img} />)}
        </div>
        <div onClick={scrollRight} className="hidden group-hover:flex flex-col items-center justify-center h-[25%] w-[5.5rem] absolute z-10 right-0 cursor-pointer">
          <AiOutlineRight size={40} />
        </div>
      </div>
    </div>
  );
}

const Img = ({ name }) => {
  return (
    <div className="img shadow inline-block mx-4">
      <Image src={name} layout='fill' objectFit="cover" />
    </div>
  )
}
 
export default ImageRow;