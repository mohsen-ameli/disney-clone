import Image from "next/image";

const Footer = () => {
  return (
    <footer className="py-16 max-w-[1400px] mx-auto">
      <div className="flex items-center">
        <p className="mr-4 text-2xl">Powered By</p>
        <Image width={160} height={80}
        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg"></Image>
      </div>
      <p>This is a clone and I made it for fun purposes. It does not have any copy righted material and I'm not affiliated with Disney+ in anyway.</p>
    </footer>
  );
}
 
export default Footer;