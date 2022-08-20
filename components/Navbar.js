import Image from "next/image";
import {AiFillStar} from "react-icons/ai"
import {MdHome} from "react-icons/md"
import {FaPlus, FaSearch} from "react-icons/fa"
import {RiMovie2Line} from "react-icons/ri"
import {TbRadio} from "react-icons/tb"
import {BsList} from "react-icons/bs"
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full h-[72px] bg-[#0e0b14] font-sans drop-shadow-2xl sticky top-0 z-20">
      <div className="flex items-center justify-between m-auto pt-3 px-4 text-[#f9f9f9]">
        <div className="flex pl-4">
          <Link href="/" >
            <Image className="cursor-pointer p-4" src="/logo.svg" alt="logo" width="79" height="48"></Image>
          </Link>

          <ul className="hidden md:flex items-center justify-between uppercase whitespace-nowrap pt-2">
            <Link href="/" >
              <a className="nav-item ml-14 ">
                <MdHome size={18} className="mr-4" /> Home
              </a>
            </Link>
            
            <Link href="/search">
              <a className="nav-item">
                <FaSearch size={16} className="mr-4" /> Search
              </a>
            </Link>
            <Link href="">
              <a className="nav-item">
                <FaPlus size={16} className="mr-4" /> Watchlist
              </a>
            </Link>
            <Link href="">
              <a className="nav-item">
                <AiFillStar size={16} className="mr-4" /> Originals
              </a>
            </Link>
            <Link href="">
              <a className="nav-item">
                <RiMovie2Line size={16} className="mr-4" /> Movies
              </a>
            </Link>
            <Link href="">
              <a className="nav-item">
                <TbRadio size={16} className="mr-4" /> Series
              </a>
            </Link>
          </ul>
        </div>

        <BsList className="md:hidden block" size={30} />

      </div>
    </div>
  );
}
 
export default Navbar;