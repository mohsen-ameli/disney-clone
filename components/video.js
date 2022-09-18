import Image from "next/image";

const Video = () => {
  return (
    <div className="max-w-[1400px] mx-auto pb-6 pt-1 px-4">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-5">
        <Vid name="disney" />
        <Vid name="pixar" />
        <Vid name="marvel" />
        <Vid name="starwars" />
        <Vid name="geo" />
        <Vid name="star" />
      </div>
    </div>
  );
}

const Vid = ({ name }) => {
  return (
    <div className="group shadow cursor-pointer bg-gradient-to-b from-[#3a3c4a] to-[#242632] border-[3px] rounded-lg hover:scale-105 hover:ease-out duration-300 border-[#434550] hover:border-[#b1b1b3] relative flex items-center justify-center">
      <Image className='self-center' src={`/${name}.png`} layout='fill' objectFit="cover" alt="image"></Image>
      <video className='rounded-lg invisible group-hover:visible' autoPlay={true} muted={true} loop={true}>
        <source src={`/${name}.mp4`} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
    </div>
  )
}
 
export default Video;