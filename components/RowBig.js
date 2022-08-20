import Image from "next/image";

const RowBig = () => {
  return (
    <div className="w-full h-full flex items-center justify-center relative my-4">
      <div className="img-big shadow mx-4">
        <Image className='block w-full' src="/prey.png" layout='fill' objectFit="cover" alt="Image Row" />
      </div>
    </div>
  );
}
 
export default RowBig;