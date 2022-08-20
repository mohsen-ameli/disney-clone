import Image from "next/image";

const RowBig = () => {
  return (
    <div className="w-full h-full flex items-center justify-center relative my-4">
      <div className="img-big shadow mx-4 flex">
        <Image className='block w-full z-10' src="/prey_logo.png" layout='fill' objectFit="cover" alt="Image Row" />
        <Image className='block w-full z-0' src="/prey.png" layout='fill' objectFit="cover" alt="Image Row" />
      </div>
    </div>
  );
}
 
export default RowBig;