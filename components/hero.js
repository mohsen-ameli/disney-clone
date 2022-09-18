import Image from "next/image";
import { motion } from "framer-motion";

const Hero = ({ src, ...rest }) => {
  return (
    <div className="w-full h-full relative inline-block snap-center img-big shadow" style={{ fontSize: 0 }} {...rest}>
      <div className="flex items-center relative">
        {src[0].width % src[0].height === 350 ?
          <ImgAni className="w-[100px] sm:w-[150px] md:w-[275px] lg:w-[350px] h-auto object-fill absolute left-10 md:left-20">
            <Image src={src[0]} alt="Image Row" />
          </ImgAni>
        :
          <ImgAni className="w-[100px] sm:w-[150px] md:w-[275px] lg:w-[350px] h-auto object-fill absolute left-10 md:left-16">
            <Image src={src[0]} alt="Image Row" />
          </ImgAni>
        }
        <div className="w-[1364px] h-[125px] sm:h-[250px] md:h-[350px] relative">
          <Image className='-z-10' src={src[1]} layout="fill" objectFit="cover" alt="Image Row" />
        </div>
      </div>
    </div>
  );
}

const ImgAni = ({ children, ...rest }) => {
  const imgVarient = {
    hidden: {
      opacity: 0,
      x: 15
    },
    visible: {
      opacity: 1,
      x: -15,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: .6,
        delay: 0.4
      }
    },
  }
  
  return (
    <motion.div
      {...rest}
      initial="hidden"
      viewport={{ once: false }}
      whileInView="visible"
      transition="transition"
      variants={imgVarient}>
      {children}
    </motion.div>
  )
}
 
export default Hero;