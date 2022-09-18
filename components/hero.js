import Image from "next/image";
import { motion } from "framer-motion";

const Hero = ({ src, ...rest }) => {
  return (
    <div className="w-[1364px] h-[350px] relative inline-block snap-center img-big shadow" {...rest}>
      {src[0].width % src[0].height === 350 ?
        <ImgAni className="absolute left-24 top-24">
          <Image src={src[0]} width={350} height={175} objectFit="cover" alt="Image Row" />
        </ImgAni>
      :
        <ImgAni className="absolute left-24 top-16">
          <Image src={src[0]} objectFit="cover" alt="Image Row" />
        </ImgAni>
      }
      <Image className='-z-10' src={src[1]} layout='fill' objectFit="cover" alt="Image Row" />
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
        type: "spring",
        ease: "easeInOut",
        duration: .75,
        delay: .5
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