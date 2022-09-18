import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="md:mb-0 mb-[70px] w-full h-[180px] bg-[#0e0b14] text-[#cacaca]">
      <div className="flex flex-col items-center space-y-6 md:space-y-4 py-4">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width="79" height="48"></Image>
        </Link>
        <div className="flex text-center space-x-5">
          <h1 className="text-[12px] font-thin">Privacy Policy</h1>
          <h1 className="text-[12px] font-thin">Subscriber Agreement</h1>
          <h1 className="text-[12px] font-thin">Mohsen&apos;s Website</h1>
          <h1 className="text-[12px] font-thin">Supported Devices</h1>
        </div>
        <h1 className="text-[12px] font-thin">@Mohsen&apos;s Disney+ Clone</h1>
      </div>
    </footer>
  );
}
 
export default Footer;